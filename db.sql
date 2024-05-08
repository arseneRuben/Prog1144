CREATE DATABASE notes_app;
use notes_app;

CREATE TABLE `notes` (
    `id` integer   auto_increment,
  `title` varchar(255) NOT NULL,
  `contents` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);