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
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `mydb`;

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
  `descripcion` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  PRIMARY KEY (`idDescripciones`))
ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Data for table `mydb`.`Descripciones`
-- -----------------------------------------------------
INSERT INTO Descripciones (idDescripciones, descripcion) VALUES
(1, 'Los perros sudan, aqui no se libra nadie Pero, ¿sabes por donde lo hacen? Si no te perdiste nuestro anterior post (50 datos interesantes sobre los gatos), seguro que ya lo sabes: efectivamente, sudan por las plantas de sus pies'),
(2, 'Tienen el sentido del oido taaan desarrollado que pueden escuchar sonidos desde una distancia de 225 hasta 230 metros. Casi nada'),
(3, 'Un perro cachorro pasa el 10% del dia alimentandose y jugando, el 90% restante lo utiliza para dormir. Lo que se dice una vida perra'),
(4, 'En Estados Unidos existe una emisora de radio solo para perros. Ha sido creada para entretener a perros que pasan muchas horas solos en casa'),
(5, 'Los perros pueden ser zurdos o diestros, indistintamente, al igual que los humanos'),
(6, 'Las estadisticas nos dicen que los perros de raza pequena viven mas que los de raza grande'),
(7, 'El doberman debe su nombre al aleman Karl Friedrich Louis Dobermann, quien a finales del siglo XIX, emprende la tarea de crear una nueva raza de perro'),
(8, 'No existe otra especie de animal que tenga la misma diversidad de razas como el perro. Tienen el record del mundo de mayor numero de razas registradas'),
(9, 'Diversos estudios han comprobado que los humanos y los canes compartimos un 75% del ADN'),
(10, 'La raza de perro mas pequena que existe es el Chihuahueno, la mas grande es el Gran Danes, la mas pesada es el San Bernardo y la mas rapida es el Galgo'),
(11, '¿Y si, ademas, os decimos que una pareja de perros y su descendencia podria producir hasta 66 mil perros en solo 6 anos? Tomando en cuenta que los perros viven un poco mas de 12 anos, la cifra se duplica y llegan a producir 132 mil perros'),
(12, 'Llegan a la madurez cuando cumplen alrededor un ano y medio'),
(13, 'Los perros aprenden de acuerdo a la experiencia'),
(14, 'Ademas, varios estudios han demostrado que, cuando se trata de recordar palabras, la habilidad de un perro puede ser igual a la de un nino de 2 anos: las razas mas inteligentes de perros pueden absorber hasta 250 palabras'),
(15, '¿Sabias que los perros son celosos? Un estudio de 2008 publicado en la revista Proceedings de la Academia Nacional de Ciencias de Estados Unidos, encontro que cuando los perros perciben que otros perros reciben recompensas por un truco y ellos no, estos se agitan, se rascan demasiado y evitan la mirada de sus colegas premiados'),
(16, 'Un perro comun tiene 42 dientes y, al igual que el ser humano, nacen con los llamados "dientes de leche"'),
(17, 'Es dificil que el "ratoncito Perez" visite a nuestros peludos, pues normalmente tragan los dientes que se les suelen caer mientras comen'),
(18, 'A los seis meses de su nacimiento, un perro ya debe tener todos sus dientes permanentes'),
(19, 'Los perros pueden ser zurdos o diestros, indistintamente, al igual que los humanos'),
(20, 'Los machos suelen ser muy territoriales: orinan para marcar territorio'),
(21, 'De acuerdo a los estudios del cientifico Stanley Coren, las razas de perro mas inteligentes son: el Pastor Aleman, el Caniche (Poodle), el Border Collie y el Golden Retriever'),
(22, 'Por otro lado, el "Perro Afgano" esta posicionado en la escala de inteligencia de Stanley Coren con el numero 79, el numero mas bajo'),
(23, '¡El sentido del olfato de un perro es INCREIBLE! Pueden oler todo tipo de cosas, incluso se dice que pueden oler celulas del cancer, epilepsia y diabetes. Para esto ultimo deben ser entrenados, pero no es algo de ciencia-ficcion...'),
(24, 'Necesitan un olfato muy fuerte porque no tienen una vision muy aguda'),
(25, '¿Sabias que la nariz del perro es la marca de identificacion unica? Esto es por que las marcas que tiene cada perro en la nariz es diferente en cada animal y sirve de identificacion como en nosotros las huellas dactilares'),
(26, 'Seguramente has escuchado que la boca de los perros es un nido de germenes; pero nada mas lejos de la realidad: se ha demostrado que, generalmente, la boca de los perros suele tener menos bacterias y germenes que la de un humano'),
(27, 'El chocolate que tanto nos gusta (y tanto les gusta...) no es bueno para ellos: la teobromina en el cacao provoca danos al sistema nervioso, el corazon y en algunos casos puede ser fatal'),
(28, 'Los perros tienen cerca de 100 expresiones faciales, la mayoria las realizan con las orejas'),
(29, 'Pueden saber como nos encontramos solo con una mirada: pueden detectar nuestras emociones solo observando nuestro rostro y a traves del nuestro tono de voz'),
(30, 'La temperatura del cuerpo de un perro es ligeramente mas alta que la de un humano: su temperatura normal esta entre 38 y 39o'),
(31, 'Los seres humanos pueden detectar sonidos a 20.000 veces por segundo, mientras que los perros pueden detectar frecuencias de 30.000 veces por segundo'),
(32, 'Los perros sufren dolor cuando hay una tormenta electrica. Estas tienen ciertas frecuencias de sonido que pueden danar sus oidos'),
(33, 'Los cachorros dalmata nacen completamente blancos'),
(34, 'El Basenji es el unico perro en el mundo que no puede ladrar'),
(35, 'Se estima que 1.000.000 de perros en los Estados Unidos, han sido nombrados como herederos por voluntad de sus duenos'),
(36, 'A un ano de edad son tan maduros fisicamente como un humano de 15 anos de edad'),
(37, 'Los perros suenan. Y los espasmos de las patas que se producen mientras duermen son senales de que tu mascota esta teniendo un sueno'),
(38, 'Dos perros callejeros en Afganistan salvaron a 50 soldados norteamericanos. Un grupo de Facebook junto cerca de 21 mil dolares para llevar a los perros de vuelta a Estados Unidos y reunirlos con los soldados'),
(39, 'La cancion de Los Beatles "A day in the Life" tiene un silbido extra, bastante agudo, que solo es audible por perros. Esto fue idea de Paul McCartney para entretener a su pastor sheltie'),
(40, 'Los perros de servicio estan entrenados para saber en que momento deben cumplir con su deber. Asi, cuando tienen los arneses puestos saben que es hora de trabajar pero en el momento en el que se los quitan saben que pueden comenzar a jugar. ¡Y asi lo hacen!'),
(41, 'En la antigua China, el emperador tenia en su ultima linea de defensa a un pequeno pekines. El perro se escondia en la manga de su tunica y atacaba al enemigo en caso de emergencia'),
(42, 'Cuando informaron a Lord Byron de que los perros no estaban permitidos en la Universidad de Cambridge, este, en signo de rebeldia, decidio llevar un oso a la institucion. ¡Cualquiera le dice nada al "osito"!'),
(43, 'Como ya os hemos contado, los perros pueden ser capaces de entender mas de 250 palabras y gestos pero es que, ademas, pueden contar hasta 5 y resolver simples problemas matematicos'),
(44, 'Se dice que los perros descienden de los lobos. En el ano 1993 fueron clasificados como una subespecie del lobo gris (Canis lupus)'),
(45, 'Pablo Picasso pintaba en varias de sus obras a su Dachshund, Lump. En su serie de las Meninas, Lump aparece en 15 de sus 44 obras'),
(46, 'El concepto de "perros guia" se origino en Suiza; estos perros, incluso, aguantan las ganas de hacer sus necesidades si es necesario'),
(47, 'Los perros no sienten culpa. Si los ves con una cara triste simplemente es la respuesta al tono de voz usado por su dueno'),
(48, 'Eddie, el Jack Russel de la serie Frasier (1993-2004), recibia mas cartas de admiradores que el propio Kelsey Grammer'),
(49, 'A los perros les encanta sentirse queridos. Los estudios demuestran que "el toque humano" mejora las funciones del perro como las respiratorias, digestivas y circulatorias. Un perro querido es un perro sano'),
(50, 'A ellos les gusta sentirse queridos, incluso esto repercute en su salud pero, ¿y nosotros? Los perros pasan a ser uno mas de la familia, nos acompanan, nos ayudan cuando lo necesitamos y, al fin y al cabo, son nuestro mejor y mas fiel amigo');

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
VALUES (1, 'Mejora de click 1', 'Duplica la produccion de clicks', '150','clicker1', 1);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (2, 'Mejora de click 2', 'Duplica la produccion de clicks', '750','clicker2', 1);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (3, 'Mejora de click 3', 'Duplica la produccion de clicks', '15000','clicker3', 1);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (4, 'Mejora de click 4', 'Duplica la produccion de clicks', '150000','clicker4', 1);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (5, 'Mejora de click 5', 'Duplica la produccion de clicks', '1500000','clicker5', 1);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (6, 'Mejora de click 6', 'Duplica la produccion de clicks', '150000000','clicker6', 1);

-- Mejoras de Pug (IDs 7-12)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (7, 'Mejora de pug 1', 'Duplica la produccion de Pugs', '100','pug1', 2);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (8, 'Mejora de pug 2', 'Duplica la produccion de Pugs', '500','pug2', 2);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (9, 'Mejora de pug 3', 'Duplica la produccion de Pugs', '10000','pug3', 2);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (10, 'Mejora de pug 4', 'Duplica la produccion de Pugs', '100000','pug4', 2);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (11, 'Mejora de pug 5', 'Duplica la produccion de Pugs', '1000000','pug5', 2);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (12, 'Mejora de pug 6', 'Duplica la produccion de Pugs', '100000000','pug6', 2);

-- Mejoras de Chihuahua (IDs 13-18)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (13, 'Mejora de chihuahua 1', 'Duplica la produccion de chihuahuas', '1000', 'chihuahua1', 3);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (14, 'Mejora de chihuahua 2', 'Duplica la produccion de chihuahuas', '5000', 'chihuahua2', 3);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (15, 'Mejora de chihuahua 3', 'Duplica la produccion de chihuahuas', '50000', 'chihuahua3', 3);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (16, 'Mejora de chihuahua 4', 'Duplica la produccion de chihuahuas', '5000000', 'chihuahua4', 3);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (17, 'Mejora de chihuahua 5', 'Duplica la produccion de chihuahuas', '5000000', 'chihuahua5', 3);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (18, 'Mejora de chihuahua 6', 'Duplica la produccion de chihuahuas', '500000000', 'chihuahua6', 3);

-- Mejoras de Poodle (IDs 19-24)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (19, 'Mejora de poodle 1', 'Duplica la produccion de poodles', '5000', 'poodle1', 4);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (20, 'Mejora de poodle 2', 'Duplica la produccion de poodles', '10000','poodle2', 4);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (21, 'Mejora de poodle 3', 'Duplica la produccion de poodles', '50000','poodle3', 4);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (22, 'Mejora de poodle 4', 'Duplica la produccion de poodles', '100000','poodle4', 4);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (23, 'Mejora de poodle 5', 'Duplica la produccion de poodles', '1000000','poodle5', 4);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (24, 'Mejora de poodle 6', 'Duplica la produccion de poodles', '10000000','poodle6', 4);

-- Mejoras de Pomeranian (IDs 25-30)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (25, 'Mejora de pomeranian 1', 'Duplica la produccion de pomeranians', '120000', 'pomeranian1', 5);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (26, 'Mejora de pomeranian 2', 'Duplica la produccion de pomeranians', '600000', 'pomeranian2', 5);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (27, 'Mejora de pomeranian 3', 'Duplica la produccion de pomeranians', '1200000', 'pomeranian3', 5);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (28, 'Mejora de pomeranian 4', 'Duplica la produccion de pomeranians', '12000000', 'pomeranian4', 5);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (29, 'Mejora de pomeranian 5', 'Duplica la produccion de pomeranians', '120000000', 'pomeranian5', 5);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (30, 'Mejora de pomeranian 6', 'Duplica la produccion de pomeranians', '1200000000', 'pomeranian6', 5);

-- Mejoras de Terrier (IDs 31-36)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (31, 'Mejora de terrier 1', 'Duplica la produccion de terriers', '1300000', 'terrier1', 6);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (32, 'Mejora de terrier 2', 'Duplica la produccion de terriers', '6500000', 'terrier2', 6);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (33, 'Mejora de terrier 3', 'Duplica la produccion de terriers', '13000000', 'terrier3', 6);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (34, 'Mejora de terrier 4', 'Duplica la produccion de terriers', '130000000', 'terrier4', 6);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (35, 'Mejora de terrier 5', 'Duplica la produccion de terriers', '1300000000', 'terrier5', 6);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (36, 'Mejora de terrier 6', 'Duplica la produccion de terriers', '13000000000', 'terrier6', 6);

-- Mejoras de Retriever (IDs 37-42)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (37, 'Mejora de retriever 1', 'Duplica la produccion de retrievers', '15000000', 'retriever1', 7);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (38, 'Mejora de retriever 2', 'Duplica la produccion de retrievers', '75000000', 'retriever2', 7);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (39, 'Mejora de retriever 3', 'Duplica la produccion de retrievers', '150000000', 'retriever3', 7);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (40, 'Mejora de retriever 4', 'Duplica la produccion de retrievers', '1500000000', 'retriever4', 7);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (41, 'Mejora de retriever 5', 'Duplica la produccion de retrievers', '15000000000', 'retriever5', 7);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (42, 'Mejora de retriever 6', 'Duplica la produccion de retrievers', '150000000000', 'retriever6', 7);

-- Mejoras de Collie (IDs 43-48)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (43, 'Mejora de collie 1', 'Duplica la produccion de collies', '200000000', 'collie1', 8);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (44, 'Mejora de collie 2', 'Duplica la produccion de collies', '1000000000', 'collie2', 8);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (45, 'Mejora de collie 3', 'Duplica la produccion de collies', '2000000000', 'collie3', 8);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (46, 'Mejora de collie 4', 'Duplica la produccion de collies', '20000000000', 'collie4', 8);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (47, 'Mejora de collie 5', 'Duplica la produccion de collies', '200000000000', 'collie5', 8);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (48, 'Mejora de collie 6', 'Duplica la produccion de collies', '2000000000000', 'collie6', 8);

-- Mejoras de Husky (IDs 49-54)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (49, 'Mejora de husky 1', 'Duplica la produccion de huskys', '3000000000', 'husky1', 9);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (50, 'Mejora de husky 2', 'Duplica la produccion de huskys', '15000000000', 'husky2', 9);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (51, 'Mejora de husky 3', 'Duplica la produccion de huskys', '30000000000', 'husky3', 9);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (52, 'Mejora de husky 4', 'Duplica la produccion de huskys', '300000000000', 'husky4', 9);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (53, 'Mejora de husky 5', 'Duplica la produccion de huskys', '3000000000000', 'husky5', 9);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (54, 'Mejora de husky 6', 'Duplica la produccion de huskys', '30000000000000', 'husky6', 9);

-- Mejoras de Shiba (IDs 55-60)
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (55, 'Mejora de shiba 1', 'Duplica la produccion de shibas', '10000000000', 'shiba1', 10);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (56, 'Mejora de shiba 2', 'Duplica la produccion de shibas', '50000000000', 'shiba2', 10);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (57, 'Mejora de shiba 3', 'Duplica la produccion de shibas', '100000000000', 'shiba3', 10);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (58, 'Mejora de shiba 4', 'Duplica la produccion de shibas', '1000000000000', 'shiba4', 10);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (59, 'Mejora de shiba 5', 'Duplica la produccion de shibas', '10000000000000', 'shiba5', 10);
INSERT INTO Mejoras (idMejoras, nombre, descripcion, precio, nombrePNG, TipoMejora_idTipoMejora)
VALUES (60, 'Mejora de shiba 6', 'Duplica la produccion de shibas', '100000000000000', 'shiba6', 10);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
