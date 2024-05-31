CREATE DATABASE IF NOT EXISTS notes_app;
use notes_app;

CREATE TABLE IF NOT EXISTS `notes` (
    `id` integer   auto_increment,
  `title` varchar(255) NOT NULL,
  `contents` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);
CREATE TABLE IF NOT EXISTS `codeurs` (
    `id` integer   auto_increment,
  `firstname` varchar(255) NOT NULL,
  `lastname` text NOT NULL,
  `experience` ENUM ('JUNIOR', 'INTERMEDIAIRE', 'SEINIOR'),
  PRIMARY KEY (`id`)
);
ALTER TABLE notes ADD column idCodeur int DEFAULT(1);
ALTER TABLE notes ADD FOREIGN KEY fk_notes_codeurs(idCodeur) REFERENCES codeurs(id) ON DELETE CASCADE;


select * from notes ;

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

select * from podcasts; 