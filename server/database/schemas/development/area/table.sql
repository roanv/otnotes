SET search_path TO development, extensions;

CREATE TABLE area (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    path ltree
);

CREATE INDEX tree_path_idx ON area USING GIST (path);

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA development TO api;
GRANT SELECT, UPDATE(path), DELETE ON area TO mod;
GRANT SELECT, INSERT ON area TO api;
GRANT UPDATE (name) ON area TO api;

CREATE FUNCTION validate_area_path_insert() 
    RETURNS TRIGGER 
    LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.path IS NULL THEN
        NEW.path := '';
    ELSEIF (SELECT count(*) FROM area WHERE path=NEW.path) < 1 THEN
        RAISE EXCEPTION 'Invalid path';
    END IF;
    NEW.path := NEW.path||NEW.id::text;
    RETURN NEW;
END;
$$;

ALTER FUNCTION validate_area_path_insert OWNER TO mod;
ALTER FUNCTION validate_area_path_insert SET search_path = development, extensions;

CREATE TRIGGER validate_area_path_insert BEFORE INSERT ON area FOR EACH ROW EXECUTE PROCEDURE validate_area_path_insert();

CREATE FUNCTION move_branch(source_id integer,destination_id integer) 
    RETURNS VOID 
    SECURITY DEFINER
    AS 
$$
DECLARE
    old_path ltree;
    new_path ltree;
BEGIN
    SELECT path INTO old_path FROM area WHERE id = source_id;
    IF destination_id IS NULL THEN 
        new_path := '';
    ELSE
        SELECT path INTO new_path FROM area WHERE id = destination_id;
    END IF;
    
    IF new_path ~ ('*.'||source_id||'.*')::lquery THEN
        RAISE EXCEPTION 'Cannot be decendent of self';
    END IF;
    UPDATE area SET path = new_path || subpath(path, nlevel(old_path)-1) WHERE path <@ old_path;
END;
$$ LANGUAGE plpgsql;

ALTER FUNCTION move_branch OWNER TO mod;
ALTER FUNCTION move_branch SET search_path = development, extensions;

CREATE FUNCTION delete_branch(source_id integer)     
    RETURNS VOID 
    SECURITY DEFINER
    AS 
$$
DECLARE
    item_path ltree;
BEGIN
    SELECT path INTO item_path FROM area WHERE id = source_id;
    DELETE FROM area WHERE path <@ item_path;
END;
$$ LANGUAGE plpgsql;

ALTER FUNCTION delete_branch OWNER TO mod;
ALTER FUNCTION delete_branch SET search_path = development, extensions;