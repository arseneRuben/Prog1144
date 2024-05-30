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

select * from podcasts; 





