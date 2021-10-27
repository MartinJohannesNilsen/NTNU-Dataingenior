DROP TABLE IF EXISTS Kandidat_kvalifikasjon;
DROP TABLE IF EXISTS Oppdrag;
DROP TABLE IF EXISTS Kvalifikasjoner;
DROP TABLE IF EXISTS Kandidater;
DROP TABLE IF EXISTS Bedrifter;


CREATE TABLE Kandidater(
  Kandidat_id Integer Auto_Increment,
  fornavn Varchar(20),
  etternavn Varchar(20),
  telefon Integer NOT NULL,
  epost Varchar(40),
  PRIMARY KEY (Kandidat_id)
);

CREATE TABLE Kvalifikasjoner(
  Kvalnr Integer Auto_Increment,
  kvalifikasjon Varchar(50),
  PRIMARY KEY (Kvalnr)
);

CREATE TABLE Kandidat_kvalifikasjon(
  Kvalnr Integer NOT NULL,
  Kandidat_id Integer,
  PRIMARY KEY (Kvalnr, Kandidat_id),
  FOREIGN KEY (Kandidat_id) REFERENCES Kandidater(Kandidat_id),
  FOREIGN KEY (Kvalnr) REFERENCES Kvalifikasjoner(Kvalnr)
);

CREATE TABLE Bedrifter(
  orgnr Integer Auto_Increment,
  navn Varchar(30),
  telefon Integer NOT NULL,
  epost Varchar(40),
  PRIMARY KEY (orgnr)
);

CREATE TABLE Oppdrag(
  Oppdragsnr Integer Auto_Increment,
  Kandidat_id INTEGER,
  orgnr INTEGER NOT NULL,
  kvalnr Integer,
  tenktStartdato Date ,
  tenktSluttdato Date,
  faktiskStartdato Date,
  faktiskSluttdato Date,
  antTimer Float,
  PRIMARY KEY (Oppdragsnr),
  FOREIGN KEY (Kandidat_id) REFERENCES Kandidater(Kandidat_id),
  FOREIGN KEY (orgnr) REFERENCES Bedrifter(orgnr),
  FOREIGN KEY (kvalnr) REFERENCES Kvalifikasjoner(kvalnr)
);


INSERT INTO Kandidater(fornavn, etternavn, telefon, epost) VALUES ("Martin", "Nilsen", 45005502, "martin@icloud.com");
INSERT INTO Kandidater(fornavn, etternavn, telefon, epost) VALUES ("Jonas", "Liahagen", 40823445, "JonasTheBeast@hotmail.com");
INSERT INTO Kandidater(fornavn, etternavn, telefon, epost) VALUES ("Kristian", "Gulaker", 40232450, "Kiwigul@stud.ntnu.no");
INSERT INTO Kandidater(fornavn, etternavn, telefon, epost) VALUES ("Lars", "Hansen", 4024550, "Larshe@stud.ntnu.no");

INSERT INTO Kvalifikasjoner(kvalifikasjon) VALUES ("Er høy");
INSERT INTO Kvalifikasjoner(kvalifikasjon) VALUES ("Er lav");
INSERT INTO Kvalifikasjoner(kvalifikasjon) VALUES ("Er gutt");

INSERT INTO Kandidat_kvalifikasjon(Kandidat_id, Kvalnr) VALUES (1,1);
INSERT INTO Kandidat_kvalifikasjon(Kandidat_id, Kvalnr) VALUES (2,2);
INSERT INTO Kandidat_kvalifikasjon(Kandidat_id, Kvalnr) VALUES (3,3);

INSERT INTO Bedrifter(navn, telefon, epost) VALUES ("Apple", 12345678, "Apple@icloud.com");
INSERT INTO Bedrifter(navn, telefon, epost) VALUES ("Microsoft", 23456789, "Microsoft@hotmail.com");
INSERT INTO Bedrifter(navn, telefon, epost) VALUES ("Tesla", 87654321, "Tesla@teslamotors.com");

INSERT INTO Oppdrag(Kandidat_id, orgnr, kvalnr, tenktStartdato, tenktSluttdato, faktiskStartdato, faktiskSluttdato, antTimer)
  VALUES (null, 2, 3, Date('2019-02-27'), Date('2019-05-31'), null, null, null);
INSERT INTO Oppdrag(Kandidat_id, orgnr, kvalnr, tenktStartdato, tenktSluttdato, faktiskStartdato, faktiskSluttdato, antTimer)
  VALUES (1, 1, 1, Date('2019-02-27'), Date('2019-05-31'), null, null, null);
INSERT INTO Oppdrag(Kandidat_id, orgnr, kvalnr, tenktStartdato, tenktSluttdato, faktiskStartdato, faktiskSluttdato, antTimer)
  VALUES (2,3,2, Date('2019-02-27'), Date('2019-05-31'), Date('2019-03-02'), Date('2019-05-15'), 200);



--SQL-setninger

--Oppgave 1
Select navn, telefon, epost from Bedrifter;

--Oppgave 2
Select Oppdragsnr, navn, telefon from Bedrifter, Oppdrag where (Bedrifter.orgnr = Oppdrag.orgnr);

--Oppgabe 3
Select Distinct fornavn, etternavn, kvalifikasjon, Kandidater.kandidat_id, Kvalifikasjoner.kvalnr from Kandidater, Kvalifikasjoner, Kandidat_kvalifikasjon where (Kandidater.Kandidat_id = Kandidat_kvalifikasjon.Kandidat_id) AND (Kvalifikasjoner.kvalnr = Kandidat_kvalifikasjon.kvalnr);

--Oppgave 4
Select fornavn, etternavn, kvalifikasjon, Kandidater.kandidat_id, Kvalifikasjoner.kvalnr from Kandidater left join Kandidat_kvalifikasjon on (Kandidater.Kandidat_id = Kandidat_kvalifikasjon.Kandidat_id) left join Kvalifikasjoner on (Kandidat_kvalifikasjon.kvalnr = Kvalifikasjoner.kvalnr);

--Oppgave 5
Select fornavn, etternavn, faktiskSluttdato, Oppdragsnr, navn from Oppdrag join Bedrifter on (Bedrifter.orgnr=Oppdrag.orgnr) join Kandidater on (Kandidater.Kandidat_id = Oppdrag.Kandidat_id) where Oppdrag.Kandidat_id=1;
