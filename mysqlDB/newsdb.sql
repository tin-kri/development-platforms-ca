-- MySQL dump 10.13  Distrib 9.5.0, for macos14.7 (arm64)
--
-- Host: localhost    Database: newsAPI
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `newsAPI`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `newsAPI` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `newsAPI`;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `body` longtext NOT NULL,
  `category` varchar(100) NOT NULL,
  `submitted_by` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_articles_users_idx` (`submitted_by`),
  CONSTRAINT `fk_articles_users` FOREIGN KEY (`submitted_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Breaking: New AI Model Released','Tech giant announces breakthrough in artificial intelligence. The new model shows unprecedented capabilities in natural language understanding.','Technology',1,'2025-11-19 13:31:55'),(2,'Local Team Wins Championship','The hometown heroes secured victory in a thrilling final match. Fans celebrated late into the night as the team brought home the trophy.','Sports',2,'2025-11-19 13:31:55'),(3,'City Council Approves New Park','After months of debate, the council voted to build a new community park. Construction is expected to begin next spring.','Politics',3,'2025-11-19 13:31:55'),(4,'My Test Article','This is the body of my article with enough characters.','Technology',6,'2025-11-28 14:07:24'),(5,'How AI Is Negatively Affecting the Creation of New Music','Artificial intelligence has become a powerful force in the music industry, offering tools that can compose melodies, generate lyrics, and even mimic the voices of famous artists. While these innovations can be exciting, they also raise concerns about the future of original music and the artists who create it.\n\nOne of the biggest issues is oversaturation. AI can produce thousands of songs in minutes, flooding platforms with content that often sounds polished but lacks genuine emotion or lived experience. This makes it harder for emerging musicians to stand out and for listeners to discover truly original work.\n\nAnother concern is creative stagnation. Many AI music models are trained on existing songs, learning from what already exists rather than imagining something new. As a result, the music they generate tends to recycle patterns, styles, and chord progressions, which can nudge the industry toward sameness rather than innovation. When commercial platforms prioritize AI-generated tracks for their low cost and high volume, human creativity risks being overshadowed.\n\nAI also raises ethical challenges. Voice-cloning tools can imitate well-known artists without their permission, blurring lines between tribute, theft, and exploitation. For musicians who rely on their unique sound to build a career, this can be deeply harmful.\n\nWhile AI has the potential to assist artists, it is equally capable of diluting originality and reshaping the industry in ways that undervalue human expression. Protecting the creative space for real musicians will be essential as technology continues to evolve.','Music',7,'2025-12-11 10:27:43'),(6,'Post Service Overwhelmed Before Christmas','As December approaches, postal services across the nation are struggling to keep up with the unprecedented surge in online orders. The convenience of online shopping has led to a dramatic increase in package deliveries, with many customers ordering gifts, decorations, and essentials from the comfort of their homes. However, this convenience comes at a cost. Postal workers report working extended hours, sorting facilities are operating at maximum capacity, and delivery delays are becoming increasingly common. The combination of increased e-commerce, staff shortages, and harsh winter weather has created a perfect storm for the postal system. Customers are advised to order early and expect potential delays as workers do their best to ensure packages arrive in time for the holidays.','News',9,'2025-12-11 14:29:44');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'john.doe@example.com','password123','2025-11-19 10:02:19'),(2,'jane.smith@example.com','password123','2025-11-19 10:02:19'),(3,'mike.johnson@example.com','password123','2025-11-19 10:02:19'),(4,'sarah.williams@example.com','password123','2025-11-19 10:02:19'),(5,'david.brown@example.com','password123','2025-11-19 10:02:19'),(6,'student@example.com','$2b$10$6j8CHhZvBu1dsnraUNDQg.AxyurOQ799VcoLHlFEYsnJmUaqBJ4bi','2025-11-27 09:37:35'),(7,'bjork.yorke@example.com','$2b$10$rIe8LJQOosp2tlDYxMWs6OPcdHBHRdypVNUNe4pt0qOm1PI3dPPka','2025-12-11 10:19:22'),(8,'user@example.com','$2b$10$t3HfuphfVR4woQwHeSYFK.WwxvRAp90MnP7XJxv9en34fF3DsWMfW','2025-12-11 14:19:51'),(9,'winston.smith@oceania.gov','$2b$10$rdEs.ni6cf2dXWQP7UOFu.TYvI5GhC.wLcxycVbdXtPgVjmPHhNCO','2025-12-11 14:24:44');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-12  9:07:48
