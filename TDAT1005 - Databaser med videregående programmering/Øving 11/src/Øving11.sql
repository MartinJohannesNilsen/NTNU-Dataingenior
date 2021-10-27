/*Oppgave a* List ut all informasjon (ordrehode og ordredetalj) om ordrer for leverandør nr 44.*/
select * from ordrehode right join ordredetalj on(ordrehode.ordrenr=ordredetalj.ordrenr) where levnr=44;

/*Oppgave b - Finn navn og by ("LevBy") for leverandører som kan levere del nummer 1.*/
select navn, levby from levinfo join prisinfo on (levinfo.levnr=prisinfo.levnr) where delnr=1;

/*Oppgave c - Finn nummer, navn og pris for den leverandør som kan levere del nummer 201 til billigst pris.*/
select levinfo.levnr, navn, pris from levinfo join prisinfo on (levinfo.levnr=prisinfo.levnr) where delnr=201 order by pris limit 1;

/*Oppgave d - Lag fullstendig oversikt over ordre nr 16, med ordrenr, dato, delnr, beskrivelse, kvantum, (enhets-)pris og beregnet beløp (=pris*kvantum).*/
select ordrehode.ordrenr, dato, delinfo.delnr, beskrivelse, kvantum, pris, ROUND(pris*kvantum,2) as "Beregnet beløp" from ordrehode
  inner join ordredetalj on (ordrehode.ordrenr=ordredetalj.ordrenr)
  inner join prisinfo on (ordredetalj.delnr=prisinfo.delnr)
  inner join delinfo on (delinfo.delnr=prisinfo.delnr)
where ordredetalj.ordrenr=16;

/*Oppgave e - Finn delnummer og leverandørnummer for deler som har en pris som er høyere enn prisen for del med katalognr X7770.*/
select delnr, levnr, pris from prisinfo
where pris>(
  select pris from prisinfo
  where katalognr="X7770"
  );

/*Oppgave f, i*/
drop table if exists byerogFylker;
create table byerogFylker(levby VARCHAR(20) NOT NULL, fylke VARCHAR(20) NOT NULL, CONSTRAINT byerogfylker_pk primary key(levby));
insert into byerogFylker select distinct levby, fylke from levinfo;

select * from byerogFylker;

drop table if exists levinfo2;
create table levinfo2(levnr INTEGER, navn VARCHAR(20) NOT NULL, adresse VARCHAR(20) NOT NULL, levby VARCHAR(20) NOT NULL,
postnr  INTEGER NOT NULL, CONSTRAINT levinfo_pk PRIMARY KEY(levnr), CONSTRAINT levinfo_fk foreign key (levby) references byerogFylker(levby));
insert into levinfo2 select distinct levnr, navn, adresse, levby, postnr from levinfo;

select * from levinfo2;

/*ii*/
drop view if exists nyLevInfo;
CREATE VIEW nyLevInfo AS SELECT * From byerogFylker natural join levinfo2 where levinfo2.levby = byerogFylker.levby;

select * from nyLevInfo;
update nyLevInfo set fylke = "Viken" where levby="�s";
DELETE FROM nyLevInfo WHERE levby="Oslo"; /*Feilmelding*/
INSERT INTO nyLevInfo (fylke,levnr, navn, adresse, levby, postnr) VALUES (a, 99,b, c, d, 1); /*Feilmelding*/

/*Oppgave G*/
Select levby from levinfo left join prisinfo on (levinfo.levnr=prisinfo.levnr) where (prisinfo.levnr is null) AND levby NOT IN(SELECT levby FROM prisinfo, levinfo where levinfo.levnr=prisinfo.levnr);

/*Oppgave H*/
drop view if exists leverandorer;
CREATE VIEW leverandorer AS SELECT DISTINCT levinfo.levnr, prisinfo.delnr, ordredetalj.ordrenr, prisinfo.pris, ordredetalj.kvantum FROM levinfo, prisinfo, ordredetalj WHERE levinfo.levnr = prisinfo.levnr AND prisinfo.delnr = ordredetalj.delnr AND ordredetalj.ordrenr = 18;
select * from leverandorer;

/*Nå må jeg finne en metode å returnere de som kan levere begge delene, ikke bare den ene*/
drop view leverandorerSortert;
create view leverandorerSortert as select levnr, count(kvantum) as Antalldeler from leverandorer group by levnr Order by Antalldeler desc;
select * from leverandorerSortert;

select levnr, "Antall deler" from leverandorerSortert where "Antall deler"=MAX("Antall deler") AND Belop=MIN(Belop) group by levnr limit 1;

/*
Lærdom jeg tar med meg herfra er at jeg kan bruke view til å lagre delinformasjon, og at en bør bruke konstanter til å bruke subqueries
Les mer om subqueries
 */


/*Jonas sin løsning*/
SELECT summings, levnr FROM
  (SELECT SUM(d.ting) AS summings, levnr FROM
    (SELECT (pris * kvantum) AS ting, levnr FROM
      (SELECT DISTINCT pris, kvantum, a.levnr FROM
        (SELECT * FROM (SELECT levnr, COUNT(levnr) AS tell FROM leverandorer GROUP BY levnr) y WHERE y.tell =
          (SELECT COUNT(delnr) FROM ordredetalj WHERE ordrenr = 18)
          )a  JOIN leverandorer ON (leverandorer.levnr = a.levnr)
        ) h
      ) d GROUP BY levnr
    ) x ORDER BY summings LIMIT 1;




/*Oppgave 2a*/
select forlag_navn, telefon from forlag where telefon like '%2_' UNION select forlag_navn, telefon from forlag where telefon not like '%2_' UNION select forlag_navn, telefon from forlag where telefon is null;

/*Oppgave 2b*/
select Round(avg(dod_aar-fode_aar),1) from forfatter where dod_aar is not null;
select Round(avg(YEAR(CURRENT_DATE)-fode_aar),1) from forfatter where dod_aar is null AND fode_aar>1900;

/*Oppgave 2c*/

select count(forfatter.forfatter_id) As Antall from forfatter
where forfatter.fode_aar is not null and forfatter.dod_aar is not null
or forfatter.fode_aar > 1900 and forfatter.dod_aar is null;
