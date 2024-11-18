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
CREATE DATABASE IF NOT EXISTS `assessment`;
USE `assessment`;

-- Dumping structure for table assessment.brand
CREATE TABLE IF NOT EXISTS `brand` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table assessment.brand
INSERT INTO `brand` (`id`, `name`) VALUES
  (1, 'Powerlife'),
  (2, 'Abbot'),
  (3, 'Blackmores'),
  (4, 'Ugoku'),
  (5, 'Comfort');

-- Dumping structure for table assessment.type
CREATE TABLE IF NOT EXISTS `type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `brand_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table assessment.type
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

-- --------------------------------------------------------
-- Table: product
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` TEXT COLLATE utf8mb4_unicode_ci,
  `price` DECIMAL(10, 2) NOT NULL,
  `brand_id` INT NOT NULL,
  `type_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `product` (`name`, `description`, `price`, `brand_id`, `type_id`) VALUES
('Product 1', 'Description for Product 1', 100.00, 1, 1),
('Product 2', 'Description for Product 2', 150.00, 2, 2),
('Product 3', 'Description for Product 3', 200.00, 3, 3),
('Product 4', 'Description for Product 4', 120.00, 1, 2),
('Product 5', 'Description for Product 5', 180.00, 2, 1),
('Product 6', 'Description for Product 6', 250.00, 3, 1);

-- Create the 'users' table with 'id' as the primary key
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ic_number VARCHAR(12) UNIQUE NOT NULL,
    age INT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
) ENGINE=InnoDB;

-- Create the 'user_phones' table with a foreign key reference to 'id' in the 'users' table
CREATE TABLE user_phones (
    user_id INT NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    PRIMARY KEY (user_id, phone_number),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Insert dummy data into the 'users' table
INSERT INTO users (name, ic_number, age, email) VALUES
('John Doe', '850101125432', 39, 'john.doe@example.com'),
('Jane Smith', '900505112233', 34, 'jane.smith@example.com'),
('Mike Johnson', '890303245678', 35, 'mike.johnson@example.com'),
('Alice Brown', '980101115432', 28, 'alice.brown@example.com'),
('Bob White', '910101132456', 42, 'bob.white@example.com'),
('Charlie Green', '920202221345', 33, 'charlie.green@example.com'),
('David Lee', '830303244567', 37, 'david.lee@example.com'),
('Eva Adams', '830303254678', 29, 'eva.adams@example.com'),
('Fiona Black', '830404221123', 31, 'fiona.black@example.com'),
('George King', '830505211234', 40, 'george.king@example.com');


-- Insert dummy phone numbers into the 'user_phones' table (using 'id' instead of 'ic_number')
INSERT INTO user_phones (user_id, phone_number) VALUES
((SELECT id FROM users WHERE ic_number = '850101125432'), '0123456789'),
((SELECT id FROM users WHERE ic_number = '850101125432'), '0198765432'),
((SELECT id FROM users WHERE ic_number = '900505112233'), '0132345678'),
((SELECT id FROM users WHERE ic_number = '900505112233'), '0172345678'),
((SELECT id FROM users WHERE ic_number = '890303245678'), '0189876543');

CREATE TABLE IF NOT EXISTS `user_products` (
    `user_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    PRIMARY KEY (`user_id`, `product_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert dummy data into user_products to associate users with products
INSERT INTO user_products (user_id, product_id) VALUES
((SELECT id FROM users WHERE ic_number = '850101125432'), (SELECT id FROM product WHERE name = 'Product 1')),
((SELECT id FROM users WHERE ic_number = '900505112233'), (SELECT id FROM product WHERE name = 'Product 2')),
((SELECT id FROM users WHERE ic_number = '890303245678'), (SELECT id FROM product WHERE name = 'Product 3')),
((SELECT id FROM users WHERE ic_number = '850101125432'), (SELECT id FROM product WHERE name = 'Product 4')),
((SELECT id FROM users WHERE ic_number = '900505112233'), (SELECT id FROM product WHERE name = 'Product 5'));


/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;


-- Inserting new users
INSERT INTO users (name, ic_number, age, email) VALUES
('Liam Johnson', '870101235432', 25, 'liam.johnson@example.com'),
('Emma Williams', '860202115432', 29, 'emma.williams@example.com'),
('Oliver Brown', '920404135678', 33, 'oliver.brown@example.com'),
('Sophia Davis', '890505176543', 38, 'sophia.davis@example.com'),
('Isabella Miller', '880303147654', 27, 'isabella.miller@example.com');
-- Inserting phone numbers for new users
INSERT INTO user_phones (user_id, phone_number) VALUES
((SELECT id FROM users WHERE ic_number = '870101235432'), '0112345678'),
((SELECT id FROM users WHERE ic_number = '870101235432'), '0123456780'),
((SELECT id FROM users WHERE ic_number = '860202115432'), '0193456789'),
((SELECT id FROM users WHERE ic_number = '860202115432'), '0113456789'),
((SELECT id FROM users WHERE ic_number = '920404135678'), '0182345678'),
((SELECT id FROM users WHERE ic_number = '920404135678'), '0193456780'),
((SELECT id FROM users WHERE ic_number = '890505176543'), '0174567890'),
((SELECT id FROM users WHERE ic_number = '890505176543'), '0195678901'),
((SELECT id FROM users WHERE ic_number = '880303147654'), '0115678901'),
((SELECT id FROM users WHERE ic_number = '880303147654'), '0176789012');
-- Inserting new products
INSERT INTO product (name, description, price, brand_id, type_id) VALUES
('Product 7', 'Description for Product 7', 130.00, 1, 3),
('Product 8', 'Description for Product 8', 220.00, 2, 4),
('Product 9', 'Description for Product 9', 160.00, 3, 2),
('Product 10', 'Description for Product 10', 190.00, 4, 5),
('Product 11', 'Description for Product 11', 140.00, 5, 4);
-- Associating new users with products
INSERT INTO user_products (user_id, product_id) VALUES
((SELECT id FROM users WHERE ic_number = '870101235432'), (SELECT id FROM product WHERE name = 'Product 7')),
((SELECT id FROM users WHERE ic_number = '860202115432'), (SELECT id FROM product WHERE name = 'Product 8')),
((SELECT id FROM users WHERE ic_number = '920404135678'), (SELECT id FROM product WHERE name = 'Product 9')),
((SELECT id FROM users WHERE ic_number = '890505176543'), (SELECT id FROM product WHERE name = 'Product 10')),
((SELECT id FROM users WHERE ic_number = '880303147654'), (SELECT id FROM product WHERE name = 'Product 11')),
((SELECT id FROM users WHERE ic_number = '870101235432'), (SELECT id FROM product WHERE name = 'Product 10')),
((SELECT id FROM users WHERE ic_number = '860202115432'), (SELECT id FROM product WHERE name = 'Product 7')),
((SELECT id FROM users WHERE ic_number = '920404135678'), (SELECT id FROM product WHERE name = 'Product 11'));
