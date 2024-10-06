-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: nodejs
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `checkoutrecords`
--

DROP TABLE IF EXISTS checkoutrecords;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE checkoutrecords (
  checkout_id int NOT NULL AUTO_INCREMENT,
  student_id int DEFAULT NULL,
  student_name varchar(100) DEFAULT NULL,
  item_name varchar(255) DEFAULT NULL,
  item_id int DEFAULT NULL,
  check_out_date date DEFAULT NULL,
  check_in_date date DEFAULT NULL,
  PRIMARY KEY (checkout_id)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkoutrecords`
--

LOCK TABLES checkoutrecords WRITE;
/*!40000 ALTER TABLE checkoutrecords DISABLE KEYS */;
INSERT INTO checkoutrecords VALUES (62,4640,'Harry','Solving Problems Mathematics',890461,'2024-03-31','2024-04-04'),(63,4723,'Nicole','Premier Golden Tips Agriculture',680456,'2024-03-31','2024-04-04'),(64,4640,'Harry','KCSE Mirror Biology',461508,'2024-04-04','2024-04-05');
/*!40000 ALTER TABLE checkoutrecords ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_items`
--

DROP TABLE IF EXISTS inventory_items;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE inventory_items (
  item_no int NOT NULL AUTO_INCREMENT,
  item_id int NOT NULL,
  item_name varchar(255) NOT NULL,
  item_category varchar(255) NOT NULL,
  item_barcode varchar(255) NOT NULL,
  item_quantity int NOT NULL,
  PRIMARY KEY (item_no)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_items`
--

LOCK TABLES inventory_items WRITE;
/*!40000 ALTER TABLE inventory_items DISABLE KEYS */;
INSERT INTO inventory_items VALUES (1,857293,'KCSE Made Familiar Mathematics','book','9759966055071',4),(2,461508,'KCSE Mirror Biology','book','9789966002686',4),(3,392047,'A+ Revision KCSE Computer Studies','book','9789966360854',5),(4,920163,'Spot On Grammar','book','9780195736083',5),(5,674319,'Top Mark Computer Studies','book','9789974730854',5),(6,185932,'The A Finder CRE Revision Book','book','9789966016904',5),(7,503726,'Test it & Fix it KCSE Physics','book','9780195747218',5),(8,829471,'Upeo wa Insha','book','9789966334284',5),(9,356801,'Mastering Chemistry Practicals','book','9966223746436',5),(10,712945,'KCSE Mirror History and Government','book','9966002588657',2),(11,890461,'Solving Problems Mathematics','book','978966496539',0),(12,680456,'Premier Golden Tips Agriculture','book','9789966341976',4),(13,90210,'Blossom of the Savannah','Book','978664756436',15),(14,63634,'A Dolls House','Book','976459253935',9),(15,173812,'Score More English','Book','978684625426',2),(17,765473,'Chozi La Heri','Book','978664635289',6),(18,890530,'KCSE Score More English','Book','978538576436',5);
/*!40000 ALTER TABLE inventory_items ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS students;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE students (
  student_id int NOT NULL AUTO_INCREMENT,
  student_name varchar(100) DEFAULT NULL,
  PRIMARY KEY (student_id)
) ENGINE=InnoDB AUTO_INCREMENT=4824 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES students WRITE;
/*!40000 ALTER TABLE students DISABLE KEYS */;
INSERT INTO students VALUES (4640,'Harry'),(4675,'Lucy'),(4723,'Nicole'),(4820,'Benjamin'),(4823,'Brandon');
/*!40000 ALTER TABLE students ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `textbooks`
--

DROP TABLE IF EXISTS textbooks;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE textbooks (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  author varchar(255) DEFAULT NULL,
  barcode varchar(255) DEFAULT NULL,
  textbook_id int DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY barcode (barcode),
  KEY idx_textbook_id (textbook_id)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `textbooks`
--

LOCK TABLES textbooks WRITE;
/*!40000 ALTER TABLE textbooks DISABLE KEYS */;
INSERT INTO textbooks VALUES (1,'KCSE Made Familiar Mathematics','Caroline Njenga','9759966055071',857293),(2,'KCSE Mirror Biology','H.W. Mwangi','9789966002686',461508),(3,'A+ Revision KCSE Computer Studies','H. Otiende','9789966360854',392047),(4,'Spot On Grammar','Angelina Lioko','9780195736083',920163),(5,'Top Mark Computer Studies','Kenya Literature Bureau','9789974730854',674319),(6,'The A Finder CRE Revision Book','Okuna E.','9789966016904',185932),(7,'Test it & Fix it KCSE Physics','Oxford','9780195747218',503726),(8,'Upeo wa Insha','Oxford','9789966334284',829471),(9,'Mastering Chemistry Practicals','Daniel Njoroge','9966223746436',356801),(10,'KCSE Mirror History and Government','Julius Ndege','9966002588657',712945),(11,'Solving Problems Mathematics','C. Muturi','978966496539',890461),(12,'Premier Golden Tips Agriculture','J. Migwi','9789966341976',680456);
/*!40000 ALTER TABLE textbooks ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS user;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  user_id int NOT NULL AUTO_INCREMENT,
  firstname varchar(255) DEFAULT NULL,
  lastname varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  is_staff tinyint(1) DEFAULT '1',
  is_admin tinyint(1) DEFAULT NULL,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES user WRITE;
/*!40000 ALTER TABLE user DISABLE KEYS */;
INSERT INTO user VALUES (26,'David','Wagacira','davidwagacira@gmail.com','4675',1,1),(27,'Mark','David','markdavid@gmail.com','2024',1,NULL),(28,'June','Jameson','junejameson@gmail.com','12345',1,NULL),(29,'Bruno','Park','brunopark@gmail.com','Pass12345',1,NULL),(30,'Mark','Ronson','markronson@gmail.com','1738',1,NULL),(31,'Peter','Parker','peterparker@gmail.com','2725',1,NULL),(33,'Brandon','Becker','brandonbecker@gmail.com','4640',1,NULL),(45,'Mark','Kamau','markamau@gmail.com','2024',1,NULL),(46,'Hazel','Kamau','hazelkamau@gmail.com','4545',1,NULL),(47,'Peter','Maina','petermaina@gmail.com','4675',1,NULL),(48,'Peter','Maina','petermaina@gmail.com','1738',1,NULL),(49,'Abel ','Mutua','abelmutua@gmail.com','4532',1,NULL),(50,'John','Kemboi','johnkemboi@gmail.com','2023',1,NULL);
/*!40000 ALTER TABLE user ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04 23:11:25
