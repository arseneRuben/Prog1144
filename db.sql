CREATE DATABASE IF NOT EXISTS podcast;
use podcast;

CREATE TABLE IF NOT EXISTS podcasts (
  `id` INT auto_increment PRIMARY KEY,
  `title` varchar(255) not null,
  `description` text,
  `contents` text,
	created_at timestamp default current_timestamp
);




