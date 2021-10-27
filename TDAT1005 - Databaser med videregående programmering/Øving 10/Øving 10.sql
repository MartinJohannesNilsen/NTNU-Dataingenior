--Oppgave 1
select * from borettslag where etabl_aar between 1975 and 1985

--Oppgave 2
SELECT DISTINCT fornavn, etternavn,' ansiennitet: ', ansiennitet, ' år' FROM andelseier ORDER BY ansiennitet DESC;

--Oppgave 3
SELECT MAX(etabl_aar) AS Eldst FROM borettslag;

--Oppgave 4
SELECT DISTINCT bygn_adr FROM bygning JOIN leilighet WHERE ant_rom >= 3;

--Oppgave 5
SELECT count(*) AS "Antall" FROM bygning WHERE bolag_navn = "Tertitten";

--Oppgave 6
SELECT borettslag.bolag_navn, COUNT(bygning.bygn_adr) AS "Antall" FROM bygning RIGHT JOIN borettslag ON bygning.bolag_navn=borettslag.bolag_navn GROUP BY bolag_navn ORDER BY bolag_navn

--Oppgave 7
Finn antall leiligheter i borettslaget "Tertitten".
SELECT borettslag.bolag_navn, COUNT(leil_nr) AS "Antall" FROM borettslag inner join bygning ON borettslag.bolag_navn=bygning.bolag_navn inner join leilighet on bygning.bygn_id=leilighet.bygn_id where borettslag.bolag_navn="Tertitten" GROUP BY bolag_navn ORDER BY bolag_navn;
/*Eller*/
Select count(*) from leilighet, bygning where leilighet.bygn_id = bygning.bygn_id AND bygning.bolag_navn = "Tertitten"

--Oppgave 8
SELECT borettslag.bolag_navn, MAX(etasje) AS "Høyeste etasje" FROM leilighet inner join bygning ON bygning.bygn_id=leilighet.bygn_id inner join borettslag on borettslag.bolag_navn="Tertitten" GROUP BY bolag_navn ORDER BY bolag_navn;

--Oppgave 9
SELECT fornavn, etternavn, telefon FROM andelseier left join leilighet on(leilighet.and_eier_nr=andelseier.and_eier_nr) where leilighet.and_eier_nr is null

--Oppgave 10
Select borettslag.bolag_navn, count(leilighet.and_eier_nr) as "Antall andelseiere" FROM borettslag left join bygning on (bygning.bolag_navn=borettslag.bolag_navn) left join leilighet on (bygning.bygn_id=leilighet.bygn_id or leilighet.and_eier_nr is null) group by borettslag.bolag_navn order by count(leilighet.and_eier_nr)

--Oppgave 11
select fornavn, etternavn, leil_nr from andelseier left join leilighet on (andelseier.and_eier_nr=leilighet.and_eier_nr)

--Oppgave 12
select bolag_navn from bygning inner join leilighet on(leilighet.bygn_id=bygning.bygn_id) where leilighet.ant_rom=4

--Oppgave 13
/*Sjekker hele først*/
select * from andelseier inner join bygning on (andelseier.bolag_navn=bygning.bolag_navn) inner join poststed on(bygning.postnr=poststed.postnr)
/*Tror jeg har misforstått oppgaven, men inkluderer den fordet*/
select COUNT(andelseier.and_eier_nr) DIV COUNT(poststed.postnr) AS "Antall andelseiere pr postnr", COUNT(andelseier.and_eier_nr) DIV count(poststed.poststed) AS "Antall andelseiere pr poststed" from andelseier inner join bygning on (andelseier.bolag_navn=bygning.bolag_navn) inner join poststed on(bygning.postnr=poststed.postnr) group by poststed.postnr
/* Prøver på nytt nå*/
select poststed.poststed, count(poststed.poststed) AS "Antall andelseiere pr poststed" from andelseier right join bygning on (andelseier.bolag_navn=bygning.bolag_navn) right join poststed on(bygning.postnr=poststed.postnr) group by poststed.poststed

select poststed.poststed, poststed.postnr, count(and_eier_nr) as "Antall" from poststed join borettslag on (poststed.postnr=borettslag.postnr) join bygning on (borettslag.bolag_navn=bygning.bolag_navn) join leilighet on (bygning.bygn_id=leilighet.bygn_id) group by poststed.postnr;
