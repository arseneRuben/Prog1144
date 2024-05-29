CREATE DATABASE IF NOT EXISTS podcast;
use podcast;

CREATE TABLE IF NOT EXISTS podcasts (
  `id` INT auto_increment PRIMARY KEY,
  `title` varchar(255) not null,
  `description` text,
  `contents` text,
	created_at timestamp default current_timestamp
);

ALTER TABLE podcasts
ADD COLUMN filename varchar(255),
ADD COLUMN langue varchar(255),
ADD COLUMN id_program INT,
ADD COLUMN id_presentation INT;

ALTER TABLE podcasts
DROP COLUMN contents;
