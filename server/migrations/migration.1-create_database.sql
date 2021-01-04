CREATE DATABASE pern;
CREATE USER username WITH createdb; 
ALTER USER username WITH password 'password'; 
GRANT all ON database pern TO username;

CREATE TABLE pern_table(
    pern_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);