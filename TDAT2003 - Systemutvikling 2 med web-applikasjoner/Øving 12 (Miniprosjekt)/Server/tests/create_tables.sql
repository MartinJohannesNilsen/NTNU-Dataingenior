/*Må lage testdatabasen i Gitlab*/

DROP TABLE IF EXISTS kommentarer;
DROP TABLE IF EXISTS sak;

CREATE TABLE sak (
 id int(11) NOT NULL AUTO_INCREMENT,
 overskrift text NOT NULL,
 forfatter varchar(256) NOT NULL,
 innhold mediumtext NOT NULL,
 tidspunkt time NOT NULL,
 dato varchar(256) NOT NULL,
 bilde mediumtext NOT NULL,
 kategori varchar(256) NOT NULL,
 viktighet int(1) NOT NULL,
 bildetekst tinytext,
 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE kommentarer (
 id int(11) NOT NULL AUTO_INCREMENT,
 nyhetssakId int(11) NOT NULL,
 datoOgTidspunkt varchar(256) NOT NULL,
 kommentar mediumtext NOT NULL,
 forfatter varchar(256) NOT NULL,
 PRIMARY KEY (id),
 KEY ForeignKey (nyhetssakId),
 CONSTRAINT ForeignKey FOREIGN KEY (nyhetssakId) REFERENCES sak (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
