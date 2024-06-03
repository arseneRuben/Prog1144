
use notes_app;

CREATE TABLE IF NOT EXISTS `program` (
  `id` integer   auto_increment,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
);



select * from program ;

CREATE DATABASE IF NOT EXISTS notes_app;
USE notes_app;
 
CREATE TABLE IF NOT EXISTS codeurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname TEXT NOT NULL,
    experience ENUM('JUNIOR', 'INTERMEDIAIRE', 'SENIOR') 
);
 
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    idCodeur INT,
    FOREIGN KEY (idCodeur) REFERENCES codeurs(id)
);

 
Drop table if exists podcasts;
  
CREATE TABLE IF NOT EXISTS podcasts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    filename VARCHAR(255),
    langue VARCHAR(255),
    id_program INT,
    id_presentation INT,
    create_at timestamp default current_timestamp(),
    descriptions VARCHAR(255)
    
);


insert into podcasts(title, descriptions, filename, langue, id_program, id_presentation) values ("Lionel Messi", "Premiere arriver de Lionel Messi a Montreal", "messi.png", "fr", 1, null);
insert into podcasts(title, descriptions, filename, langue, id_program, id_presentation) values ("Second Podcast", "This is a second Podcast", "podcast2.mp3", "fr", 2, 101);
insert into podcasts(title, descriptions, filename, langue, id_program, id_presentation) values ("Third Podcast", "This is a third Podcast", "podcast3.mp3", "fr", 3, 102);

select * from podcasts; 


ALTER TABLE notes ADD column idCodeur int DEFAULT(1);
ALTER TABLE notes ADD FOREIGN KEY fk_notes_codeurs(idCodeur) REFERENCES codeurs(id) ON DELETE CASCADE;


select * from notes ;

CREATE TABLE `event` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `date` timestamp NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdBy` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_animator` (`createdBy`),
  CONSTRAINT `fk_animator` FOREIGN KEY (`createdBy`) REFERENCES `animator` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `animator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



