DROP TABLE IF EXISTS andelseiere;
DROP TABLE IF EXISTS leiligheter;
DROP TABLE IF EXISTS bygninger;
DROP TABLE IF EXISTS borettslag;

CREATE TABLE borettslag(
  borettslagsid INT NOT NULL AUTO_INCREMENT,
  navn VARCHAR(40) NOT NULL,
  adresse VARCHAR(40) NOT NULL,
  antBygg INT,
  etableringsaar INT,
  PRIMARY KEY (borettslagsid)
);

CREATE TABLE bygninger(
  bygningsnummer INT NOT NULL AUTO_INCREMENT,
  antLeiligheter INT,
  antEtg INT,
  borettslagsid INT NOT NULL,
  PRIMARY KEY (bygningsnummer),
  FOREIGN KEY (borettslagsid) REFERENCES borettslag(borettslagsid)
);

CREATE TABLE leiligheter(
  leilighetsNr INT NOT NULL AUTO_INCREMENT,
  bygningsnummer INT NOT NULL,
  areal FLOAT,
  antRom INT,
  etg INT,
  PRIMARY KEY (leilighetsNr),
  FOREIGN KEY (bygningsnummer) REFERENCES bygninger(bygningsnummer)
);

CREATE TABLE andelseiere(
  personnummer VARCHAR(15) NOT NULL,
  leilighetsNr INTEGER,
  navn VARCHAR(40) NOT NULL,
  PRIMARY KEY (personnummer),
  FOREIGN KEY (leilighetsNr) REFERENCES leiligheter(leilighetsNr)
);

/* Her skriver jeg inset setningene */

INSERT INTO borettslag (navn, adresse, antBygg, etableringsaar) VALUES
('B1', 'Osloveien 1', 12, 1287), ('B2', 'Osloveien 2', 12, 1287), ('B3', 'Osloveien 3', 12, 1287);

INSERT INTO bygninger (antLeiligheter, antEtg, borettslagsid) VALUES
(30, 6, 1), (25, 5, 2), (30, 5, 3);

INSERT INTO leiligheter (areal, antRom, bygningsnummer, etg) VALUES
(21.2, 2, 1, 1), (40.5, 4, 2, 4), (50, 5, 3, 4);

INSERT INTO andelseiere (personnummer, navn, leilighetsNr) VALUES
(26039911111, "Martin", 1), (26039922222, "Johannes", 2), (26039933333, "Henrik", 3);
