BEGIN;
-- EXTENSIONS
    \i server/database/config/extensions.sql
-- DEVELOPMENT SCHEMA
    \i server/database/schemas/development/schema.sql
    \i server/database/schemas/development/area/table.sql
    \i server/database/schemas/development/area/seed.sql
COMMIT;