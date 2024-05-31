use notes_app;

CREATE TABLE IF NOT EXISTS `program` (
  `id` integer   auto_increment,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
);



select * from program ;