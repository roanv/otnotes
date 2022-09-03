-- RUN AS SUPER USER
CREATE DATABASE otnotes;
CREATE ROLE admin PASSWORD 'password'; -- USE WITH CAUTION - owns tables and has full privilege
CREATE ROLE mod PASSWORD 'password'; -- responsible for running functions for API that require higher privilege (through security definer)
CREATE ROLE api PASSWORD 'password'; -- limited privilege - ONLY USE API to interact with database

ALTER ROLE admin WITH LOGIN;
GRANT CONNECT, CREATE ON DATABASE otnotes TO admin;
GRANT mod TO admin; -- to allow shifting ownership of functions