-- For å lage tabellene
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


-- For å lage en sak
INSERT INTO `sak` (`id`, `overskrift`, `forfatter`, `innhold`, `tidspunkt`, `dato`, `bilde`, `kategori`, `viktighet`, `bildetekst`) VALUES (
    NULL, 
    'Volkswagen varsler elektrisk stasjonsvogn i ID-serien', 
    'Stein Jarle Olsen', 
    'Volkswagen melder mandag morgen at de vil vise frem ID. Space Vizzion på Los Angeles Auto Show om en drøy uke.\r\n\r\nBilen blir en stasjonsvogn som skal kombinere aerodynamikken i en gran turismo-bil med romsligheten til en SUV, ifølge Volkswagen. Den skal ha en WLTP-rekkevidde på inntil 590 kilometer etter WLTP-standarden eller 482 kilometer etter den strengere og mer realistiske amerikanske EPA-standarden.\r\n\r\nVolkswagen har foreløpig ikke oppgitt noen batterikapasitet, men da de presenterte slektningen ID. Vizzion i fjor, oppga de en batterikapasitet så høy som 111 kilowattimer. Det er jo åpenbart lett å tenke at Space Vizzion vil ha en liknende batteripakke.\r\n\r\nSpace Vizzion vil selvfølgelig være bygget på Volkswagens MEB-plattform, i likhet med alle de andre konseptene Volkswagen har presentert.\r\n\r\nInnvendig kan det se ut som om Volkswagen har latt seg inspirere av Tesla, med en svært minimalistisk fremtoning og en enkelt stor skjerm i midtkonsollen.\r\n\r\nInteriørbildet de har sluppet viser imidlertid en karakteristisk HUD-åpning foran føreren, så det vil potensielt være mindre nødvendig å se på skjermen enn for eksempel i en Tesla Model 3.\r\n\r\nAlle materialene skal være bærekraftige, blant annet med en kunstig skinnvariant Volkswagen kaller AppleSkin, som skal være produsert delvis fra avfallsprodukter fra eplejusproduksjon.\r\n\r\n– ID. Space Vizzion er en studie for fremtiden, men ikke en drøm. Produksjonsversjonen vil slippes sent i 2021 og vil komme i ulike versjoner for Nord-Amerika, Europa og Kina, skriver Volkswagen i en melding. Bilen skal vises frem 19. november.\r\n\r\nPå bilmessen i Los Angeles vil vi også få se Fords Mustang-inspirerte elbil, potensielt kalt Mach E, Audis nye e-tron Sportback og Porsches nye og rimeligere 4S-versjon av Taycan.',
    '17:47:00',
    '18.11.19', 
    'https://shared.cdn.smp.schibsted.com/v2/images/ae9dc645-5450-4006-8023-f02deabfe7f7?fit=crop&h=947&w=1700&s=c7a572b022199d6ab64affbc12f82d4c056a9422', 
    'Teknologi', 
    '1', 
    'Volkswagens nye ID-konsept heter Space Vizzion og er en aerodynamisk stasjonsvogn med rekkevidde på nesten 600 kilometer'
);



