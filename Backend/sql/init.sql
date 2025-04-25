-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

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
  `estaEliminado` TINYINT(1) NULL,
  `puntos` INT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC) VISIBLE)
ENGINE = InnoDB;


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
  PRIMARY KEY (`idEdificios`),
  INDEX `fk_Edificios_Descripciones1_idx` (`Descripciones_idDescripciones` ASC) VISIBLE,
  CONSTRAINT `fk_Edificios_Descripciones1`
    FOREIGN KEY (`Descripciones_idDescripciones`)
    REFERENCES `mydb`.`Descripciones` (`idDescripciones`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
