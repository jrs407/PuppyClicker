-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Create user and grant privileges
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY 'puppypassword';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(45) NOT NULL,
  `contrasena` LONGTEXT NOT NULL,
  `estaEliminado` TINYINT(1) DEFAULT 0,
  `puntos` INT DEFAULT 0,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC) VISIBLE)
ENGINE = InnoDB AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `mydb`.`Descripciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Descripciones` (
  `idDescripciones` INT NOT NULL,
  `descripcion` LONGTEXT NULL,
  PRIMARY KEY (`idDescripciones`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Edificios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Edificios` (
  `idEdificios` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `raza` VARCHAR(45) NULL,
  `precioInicial` INT NULL,
  `Descripciones_idDescripciones` INT NOT NULL,
  `produccionInicial` INT NULL,
  PRIMARY KEY (`idEdificios`),
  INDEX `fk_Edificios_Descripciones1_idx` (`Descripciones_idDescripciones` ASC) VISIBLE,
  CONSTRAINT `fk_Edificios_Descripciones1`
    FOREIGN KEY (`Descripciones_idDescripciones`)
    REFERENCES `mydb`.`Descripciones` (`idDescripciones`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Data for table `mydb`.`Edificios`
-- -----------------------------------------------------
INSERT INTO Edificios (idEdificios, nombre, raza, precioInicial, Descripciones_idDescripciones, produccionInicial) 
VALUES (1, 'Pug', 'pug', 15, 1, 1);
INSERT INTO Edificios (idEdificios, nombre, raza, precioInicial, Descripciones_idDescripciones, produccionInicial) 
VALUES (2, 'Chihuahua', 'chihuahua', 100, 1, 2);
INSERT INTO Edificios (idEdificios, nombre, raza, precioInicial, Descripciones_idDescripciones, produccionInicial) 
VALUES (3, 'Poodle', 'poodle', 1100, 1, 10);
INSERT INTO Edificios (idEdificios, nombre, raza, precioInicial, Descripciones_idDescripciones, produccionInicial) 
VALUES (4, 'Pomeranian', 'pomeranian', 12000, 1, 50);
INSERT INTO Edificios (idEdificios, nombre, raza, precioInicial, Descripciones_idDescripciones, produccionInicial) 
VALUES (5, 'Terrier', 'terrier', 130000, 1, 300);
INSERT INTO Edificios (idEdificios, nombre, raza, precioInicial, Descripciones_idDescripciones, produccionInicial) 
VALUES (6, 'Retriever', 'retriever', 1500000, 1, 1500);
INSERT INTO Edificios (idEdificios, nombre, raza, precioInicial, Descripciones_idDescripciones, produccionInicial) 
VALUES (7, 'Collie', 'collie', 20000000, 1, 8000);
INSERT INTO Edificios (idEdificios, nombre, raza, precioInicial, Descripciones_idDescripciones, produccionInicial) 
VALUES (8, 'Husky', 'husky', 300000000, 1, 50000);
INSERT INTO Edificios (idEdificios, nombre, raza, precioInicial, Descripciones_idDescripciones, produccionInicial) 
VALUES (9, 'Shiba', 'Shiba', 1000000000, 1, 500000);


-- -----------------------------------------------------
-- Table `mydb`.`Edificios_has_Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Edificios_has_Usuario` (
  `Edificios_idEdificios` INT NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  `numeroComprado` VARCHAR(45) NULL,
  PRIMARY KEY (`Edificios_idEdificios`, `Usuario_idUsuario`),
  INDEX `fk_Edificios_has_Usuario_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  INDEX `fk_Edificios_has_Usuario_Edificios_idx` (`Edificios_idEdificios` ASC) VISIBLE,
  CONSTRAINT `fk_Edificios_has_Usuario_Edificios`
    FOREIGN KEY (`Edificios_idEdificios`)
    REFERENCES `mydb`.`Edificios` (`idEdificios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Edificios_has_Usuario_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TipoMejora`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TipoMejora` (
  `idTipoMejora` INT NOT NULL,
  `categoria` INT NULL,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idTipoMejora`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Mejoras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Mejoras` (
  `idMejoras` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `descripcion` VARCHAR(45) NULL,
  `precio` VARCHAR(45) NULL,
  `nombrePNG` VARCHAR(45) NULL,
  `TipoMejora_idTipoMejora` INT NOT NULL,
  PRIMARY KEY (`idMejoras`),
  INDEX `fk_Mejoras_TipoMejora1_idx` (`TipoMejora_idTipoMejora` ASC) VISIBLE,
  CONSTRAINT `fk_Mejoras_TipoMejora1`
    FOREIGN KEY (`TipoMejora_idTipoMejora`)
    REFERENCES `mydb`.`TipoMejora` (`idTipoMejora`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Usuario_has_Mejoras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuario_has_Mejoras` (
  `Usuario_idUsuario` INT NOT NULL,
  `Mejoras_idMejoras` INT NOT NULL,
  PRIMARY KEY (`Usuario_idUsuario`, `Mejoras_idMejoras`),
  INDEX `fk_Usuario_has_Mejoras_Mejoras1_idx` (`Mejoras_idMejoras` ASC) VISIBLE,
  INDEX `fk_Usuario_has_Mejoras_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_has_Mejoras_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_has_Mejoras_Mejoras1`
    FOREIGN KEY (`Mejoras_idMejoras`)
    REFERENCES `mydb`.`Mejoras` (`idMejoras`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Data for table `mydb`.`TipoMejora`
-- -----------------------------------------------------
INSERT INTO TipoMejora (idTipoMejora, categoria, nombre)
VALUES (1, 1, 'click');
INSERT INTO TipoMejora (idTipoMejora, categoria, nombre)
VALUES (2, 2, 'pug');
INSERT INTO TipoMejora (idTipoMejora, categoria, nombre)
VALUES (3, 3, 'chihuahua');
INSERT INTO TipoMejora (idTipoMejora, categoria, nombre)
VALUES (4, 4, 'poodle');
INSERT INTO TipoMejora (idTipoMejora, categoria, nombre)
VALUES (5, 5, 'pomeranian');
INSERT INTO TipoMejora (idTipoMejora, categoria, nombre)
VALUES (6, 6, 'terrier');
INSERT INTO TipoMejora (idTipoMejora, categoria, nombre)
VALUES (7, 7, 'retriever');
INSERT INTO TipoMejora (idTipoMejora, categoria, nombre)
VALUES (8, 8, 'collie');
INSERT INTO TipoMejora (idTipoMejora, categoria, nombre)
VALUES (9, 9, 'husky');
INSERT INTO TipoMejora (idTipoMejora, categoria, nombre)
VALUES (10, 10, 'shiba');

-- -----------------------------------------------------
-- Data for table `mydb`.`Mejoras`
-- -----------------------------------------------------

-- Mejoras de Click (IDs 1-6)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (1, 'Mejora de click 1', 'Duplica la producción de clicks', '150','clicker1', 1);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (2, 'Mejora de click 2', 'Duplica la producción de clicks', '750','clicker2', 1);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (3, 'Mejora de click 3', 'Duplica la producción de clicks', '15000','clicker3', 1);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (4, 'Mejora de click 4', 'Duplica la producción de clicks', '150000','clicker4', 1);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (5, 'Mejora de click 5', 'Duplica la producción de clicks', '1500000','clicker5', 1);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (6, 'Mejora de click 6', 'Duplica la producción de clicks', '150000000','clicker6', 1);

-- Mejoras de Pug (IDs 7-12)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (7, 'Mejora de pug 1', 'Duplica la producción de Pugs', '100','pug1', 2);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (8, 'Mejora de pug 2', 'Duplica la producción de Pugs', '500','pug2', 2);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (9, 'Mejora de pug 3', 'Duplica la producción de Pugs', '10000','pug3', 2);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (10, 'Mejora de pug 4', 'Duplica la producción de Pugs', '100000','pug4', 2);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (11, 'Mejora de pug 5', 'Duplica la producción de Pugs', '1000000','pug5', 2);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (12, 'Mejora de pug 6', 'Duplica la producción de Pugs', '100000000','pug6', 2);

-- Mejoras de Chihuahua (IDs 13-18)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (13, 'Mejora de chihuahua 1', 'Duplica la producción de chihuahuas', '1000', 'chihuahua1', 3);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (14, 'Mejora de chihuahua 2', 'Duplica la producción de chihuahuas', '5000', 'chihuahua2', 3);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (15, 'Mejora de chihuahua 3', 'Duplica la producción de chihuahuas', '50000', 'chihuahua3', 3);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (16, 'Mejora de chihuahua 4', 'Duplica la producción de chihuahuas', '5000000', 'chihuahua4', 3);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (17, 'Mejora de chihuahua 5', 'Duplica la producción de chihuahuas', '5000000', 'chihuahua5', 3);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (18, 'Mejora de chihuahua 6', 'Duplica la producción de chihuahuas', '500000000', 'chihuahua6', 3);

-- Mejoras de Poodle (IDs 19-24)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (19, 'Mejora de poodle 1', 'Duplica la producción de poodles', '5000', 'poodle1', 4);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (20, 'Mejora de poodle 2', 'Duplica la producción de poodles', '10000','poodle2', 4);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (21, 'Mejora de poodle 3', 'Duplica la producción de poodles', '50000','poodle3', 4);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (22, 'Mejora de poodle 4', 'Duplica la producción de poodles', '100000','poodle4', 4);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (23, 'Mejora de poodle 5', 'Duplica la producción de poodles', '1000000','poodle5', 4);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (24, 'Mejora de poodle 6', 'Duplica la producción de poodles', '10000000','poodle6', 4);

-- Mejoras de Pomeranian (IDs 25-30)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (25, 'Mejora de pomeranian 1', 'Duplica la producción de pomeranians', '120000', 'pomeranian1', 5);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (26, 'Mejora de pomeranian 2', 'Duplica la producción de pomeranians', '600000', 'pomeranian2', 5);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (27, 'Mejora de pomeranian 3', 'Duplica la producción de pomeranians', '1200000', 'pomeranian3', 5);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (28, 'Mejora de pomeranian 4', 'Duplica la producción de pomeranians', '12000000', 'pomeranian4', 5);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (29, 'Mejora de pomeranian 5', 'Duplica la producción de pomeranians', '120000000', 'pomeranian5', 5);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (30, 'Mejora de pomeranian 6', 'Duplica la producción de pomeranians', '1200000000', 'pomeranian6', 5);

-- Mejoras de Terrier (IDs 31-36)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (31, 'Mejora de terrier 1', 'Duplica la producción de terriers', '1300000', 'terrier1', 6);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (32, 'Mejora de terrier 2', 'Duplica la producción de terriers', '6500000', 'terrier2', 6);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (33, 'Mejora de terrier 3', 'Duplica la producción de terriers', '13000000', 'terrier3', 6);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (34, 'Mejora de terrier 4', 'Duplica la producción de terriers', '130000000', 'terrier4', 6);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (35, 'Mejora de terrier 5', 'Duplica la producción de terriers', '1300000000', 'terrier5', 6);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (36, 'Mejora de terrier 6', 'Duplica la producción de terriers', '13000000000', 'terrier6', 6);

-- Mejoras de Retriever (IDs 37-42)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (37, 'Mejora de retriever 1', 'Duplica la producción de retrievers', '15000000', 'retriever1', 7);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (38, 'Mejora de retriever 2', 'Duplica la producción de retrievers', '75000000', 'retriever2', 7);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (39, 'Mejora de retriever 3', 'Duplica la producción de retrievers', '150000000', 'retriever3', 7);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (40, 'Mejora de retriever 4', 'Duplica la producción de retrievers', '1500000000', 'retriever4', 7);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (41, 'Mejora de retriever 5', 'Duplica la producción de retrievers', '15000000000', 'retriever5', 7);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (42, 'Mejora de retriever 6', 'Duplica la producción de retrievers', '150000000000', 'retriever6', 7);

-- Mejoras de Collie (IDs 43-48)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (43, 'Mejora de collie 1', 'Duplica la producción de collies', '200000000', 'collie1', 8);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (44, 'Mejora de collie 2', 'Duplica la producción de collies', '1000000000', 'collie2', 8);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (45, 'Mejora de collie 3', 'Duplica la producción de collies', '2000000000', 'collie3', 8);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (46, 'Mejora de collie 4', 'Duplica la producción de collies', '20000000000', 'collie4', 8);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (47, 'Mejora de collie 5', 'Duplica la producción de collies', '200000000000', 'collie5', 8);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (48, 'Mejora de collie 6', 'Duplica la producción de collies', '2000000000000', 'collie6', 8);

-- Mejoras de Husky (IDs 49-54)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (49, 'Mejora de husky 1', 'Duplica la producción de huskys', '3000000000', 'husky1', 9);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (50, 'Mejora de husky 2', 'Duplica la producción de huskys', '15000000000', 'husky2', 9);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (51, 'Mejora de husky 3', 'Duplica la producción de huskys', '30000000000', 'husky3', 9);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (52, 'Mejora de husky 4', 'Duplica la producción de huskys', '300000000000', 'husky4', 9);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (53, 'Mejora de husky 5', 'Duplica la producción de huskys', '3000000000000', 'husky5', 9);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (54, 'Mejora de husky 6', 'Duplica la producción de huskys', '30000000000000', 'husky6', 9);

-- Mejoras de Shiba (IDs 55-60)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (55, 'Mejora de shiba 1', 'Duplica la producción de shibas', '10000000000', 'shiba1', 10);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (56, 'Mejora de shiba 2', 'Duplica la producción de shibas', '50000000000', 'shiba2', 10);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (57, 'Mejora de shiba 3', 'Duplica la producción de shibas', '100000000000', 'shiba3', 10);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (58, 'Mejora de shiba 4', 'Duplica la producción de shibas', '1000000000000', 'shiba4', 10);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (59, 'Mejora de shiba 5', 'Duplica la producción de shibas', '10000000000000', 'shiba5', 10);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (60, 'Mejora de shiba 6', 'Duplica la producción de shibas', '100000000000000', 'shiba6', 10);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
