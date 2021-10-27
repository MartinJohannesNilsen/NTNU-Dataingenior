DROP TABLE IF EXISTS person;

CREATE TABLE person  (
  id int(11) NOT NULL AUTO_INCREMENT,
  navn varchar(256) NOT NULL,
  alder int(3) DEFAULT NULL,
  adresse varchar(256) NOT NULL,
  bilde_base64 longtext,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
