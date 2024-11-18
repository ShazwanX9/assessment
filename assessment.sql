-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for assessment
CREATE DATABASE IF NOT EXISTS `assessment` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `assessment`;

-- Dumping structure for table assessment.brand
CREATE TABLE IF NOT EXISTS `brand` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table assessment.brand: ~5 rows (approximately)
INSERT INTO `brand` (`id`, `name`) VALUES
	(1, 'Powerlife'),
	(2, 'Abbot'),
	(3, 'Blackmores'),
	(4, 'Ugoku'),
	(5, 'Comfort');

-- Dumping structure for table assessment.type
CREATE TABLE IF NOT EXISTS `type` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `brand_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table assessment.type: ~20 rows (approximately)
INSERT INTO `type` (`id`, `name`, `brand_id`) VALUES
	(1, 'K2D3', 1),
	(2, 'Optiglo', 1),
	(3, 'Cognimag', 1),
	(4, 'Asta Omega', 1),
	(5, 'Freestyle Lancets', 2),
	(6, 'Pediasure 10+ Choco', 2),
	(7, 'Surbex Nutrifiber', 2),
	(8, 'Hidrasec Granules', 2),
	(9, 'B+C', 3),
	(10, 'Bio Zinc Plus', 3),
	(11, 'Vitamin C', 3),
	(12, 'Multivit + Minerals', 3),
	(13, 'Arm Sling', 4),
	(14, 'Abdominal Binder', 4),
	(15, 'Compression Sleeve', 4),
	(16, 'Finger Splint', 4),
	(17, 'Juniorguard', 4),
	(18, 'K9 Steel Reclining Wheelchair', 5),
	(19, 'Electric Homecare Bed', 5),
	(20, 'K7 Biatric Aluminium Wheelchair', 5);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
