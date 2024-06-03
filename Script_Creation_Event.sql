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
