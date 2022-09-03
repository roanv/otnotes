-- run as super user
\prompt 'Password for admin: ' admin_pass
\prompt 'Password for mod: ' mod_pass
\prompt 'Password for api: ' api_pass
CREATE ROLE admin PASSWORD :'admin_pass'; -- USE WITH CAUTION - owns tables and has full privilege
CREATE ROLE mod PASSWORD :'mod_pass'; -- responsible for running functions for API that require higher privilege (through security definer)
CREATE ROLE api PASSWORD :'api_pass'; -- limited privilege - ONLY USE API to interact with database

ALTER ROLE admin WITH LOGIN;
GRANT CONNECT, CREATE ON DATABASE otnotes TO admin;
GRANT mod TO admin; -- to allow shifting ownership of functions

ALTER ROLE api SET search_path TO development;