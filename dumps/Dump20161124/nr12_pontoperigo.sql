-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: nr12
-- ------------------------------------------------------
-- Server version	5.7.11-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pontoperigo`
--

DROP TABLE IF EXISTS `pontoperigo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pontoperigo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `face` varchar(45) DEFAULT NULL,
  `laudo` int(11) NOT NULL,
  `anexo1` char(1) DEFAULT NULL,
  `nbr14153` char(1) DEFAULT NULL,
  `severidade` int(11) DEFAULT NULL,
  `frequencia` int(11) DEFAULT NULL,
  `possibilidade` int(11) DEFAULT NULL,
  `pe` int(11) DEFAULT NULL,
  `fe` int(11) DEFAULT NULL,
  `pmp` int(11) DEFAULT NULL,
  `np` int(11) DEFAULT NULL,
  `nivelrisco` float DEFAULT NULL,
  `parecerintroducao` longtext,
  `parecerconclusao` longtext,
  PRIMARY KEY (`id`),
  KEY `fk_pontodeperigo_Laudos1_idx` (`laudo`),
  CONSTRAINT `fk_pontodeperigo_Laudos1` FOREIGN KEY (`laudo`) REFERENCES `laudos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pontoperigo`
--

LOCK TABLES `pontoperigo` WRITE;
/*!40000 ALTER TABLE `pontoperigo` DISABLE KEYS */;
/*!40000 ALTER TABLE `pontoperigo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-24 22:02:17
