/*Må legge inn testdata i testdatabasen i Gitlab*/

/*Husk at id er AUTO_INCREMENT og derav løpende fra 1 og oppover*/
INSERT INTO sak (overskrift, forfatter, innhold, tidspunkt, dato, bilde, kategori, viktighet, bildetekst) VALUES 
    ("Testsak 1", "Martin", "Dette er innholdet i testsak 1", "23:40:00", "12.11.19", "https://test1.no", "Teknologi", 1, NULL),
    ("Testsak 2", "Simon", "Dette er innholdet i testsak 2", "10:25:00", "30.10.19", "https://test2.no", "Sport", 2, NULL), 
    ("Testsak 3", "Jonas", "Dette er innholdet i testsak 3", "00:37:00", "13.11.19", "https://test3.no", "Nyheter", 1, NULL), 
    ("Testsak 4", "Lea", "Dette er innholdet i testsak 4", "18:16:00", "05.11.19", "https://test4.no", "Underholdning", 2, NULL), 
    ("Testsak 5", "Max", "Dette er innholdet i testsak 5", "13:44:00", "30.10.19", "https://test5.no", "Politikk", 1, NULL),
    ("Testsak 6", "Zaim", "Dette er innholdet i testsak 6", "11:44:00", "20.10.19", "https://test6.no", "Økonomi", 1, NULL);


/*Husk at her blir id satt automatisk fra 1 og inkrementerende*/
INSERT INTO kommentarer (nyhetssakId, datoOgTidspunkt, kommentar, forfatter) VALUES 
    (1, "15.11.19 - 14:56", "Enig", "Ole"), 
    (2, "15.11.19 - 19:45", "Ganske enig", "Martin"), 
    (3, "16.11.19 - 11:41", "Dette er tull", "Simon"),
    (4, "16.11.19 - 15:41", "Tullær", "Lea");
