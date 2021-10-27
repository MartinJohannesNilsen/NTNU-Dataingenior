-- For å lage tabellen
CREATE TABLE `nyhetssaker` (
`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
`overskrift` varchar(100) NOT NULL, 
`innhold` varchar(1000) NOT NULL, 
`tidspunkt` TIME NOT NULL, 
`bilde` longtext,
`kategori` varchar(100), 
`viktighet` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

