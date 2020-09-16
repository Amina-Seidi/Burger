CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers(
id INT (10)AUTO_INCREMENT,
burger_name VARCHAR(30),
devoured BOOLEAN default false,
PRIMARY KEY (id)
)
SELECT * FROM burgers;
