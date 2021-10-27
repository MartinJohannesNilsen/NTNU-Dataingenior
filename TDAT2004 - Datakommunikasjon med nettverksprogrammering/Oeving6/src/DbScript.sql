DROP TABLE IF EXISTS Konto;
CREATE TABLE Konto(
  kontonr integer NOT NULL,
  saldo double,
  eier varchar(250) NOT NULL,
  optimistiskLås integer NOT NULL,
  PRIMARY KEY (kontonr)
);