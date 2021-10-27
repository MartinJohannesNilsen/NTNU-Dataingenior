import java.io.*;
import java.util.*;
class Konferansesenter{
  private ArrayList<Rom> romliste = new ArrayList<Rom>();

  public Konferansesenter(){
  }

  //Først må en kunne få registrert rom
  public boolean registrerRom(int romNummer, int størrelse){
    if(romliste.size() == 0){ //For å forhindre å søke i neste metode med en tom tabell
      Rom nyttRom = new Rom(romNummer, størrelse);
      romliste.add(nyttRom);
      return true;
    }
    if(omRegistrertFraFør(romNummer)){
      return false;
    }
    if(romNummer <= 0){
      System.out.println("Romnr. kan ikke være 0 eller mindre");
      return false;
    }
    Rom nyttRom = new Rom(romNummer, størrelse);
    romliste.add(nyttRom);
    return true;
  }

  //Hjelpemetode for å sjekke om et rom allerede er registrert
  private boolean omRegistrertFraFør(int rom){
    for(int i = 0; i<romliste.size(); i++){
      if(romliste.get(i).getRomNr() == rom){
        System.out.println("Rommet er allerede registrert");
        return true;
      }
    }
    return false;
  }

  private void finnBestemtReservasjon(int romnummer){
    System.out.println(romliste.get(romnummer).returnRes().toString());
  }

  //Metode for å reservere rom
  public boolean reserverRom(Tidspunkt tidFra, Tidspunkt tidTil, int antPersoner, String navn, String tlf){
    Kunde kunde = new Kunde(navn, tlf);
    int ledigRomNummer = finnRiktigStørrelseOgLedig(antPersoner, tidFra, tidTil); //her sitter du igjen med et ledig rom, "finnRiktigStørrelseOgLedig(antPersoner, tidFra, tidTil)"
    //System.out.println(ledigRomNummer);
    if(ledigRomNummer == -1){
      System.out.println("Det var ikke mulig å reservere rommet til det tidspunktet");
      return false;
    }
    romliste.get(ledigRomNummer-1).reservering(tidFra, tidTil, kunde); //skal en bruke romnummer som index er det viktig med -1
    return true;
  }

  //Hjelpemetode for å finne et rom som både har plass og er ledig
  private int finnRiktigStørrelseOgLedig(int antMennesker, Tidspunkt fraTid, Tidspunkt tilTid){ //Denne metoden søker gjennom romliste og returnerer et ledig rom med riktig størrelse
    int romnummer = -1;
    for(int i = 0; i<romliste.size(); i++){
      if(romliste.get(i).getRomStørrelse() >= antMennesker && !romliste.get(i).sjekkOverLapp(fraTid, tilTid)){
        romnummer = romliste.get(i).getRomNr();
        return romnummer;
      }
    }
    return romnummer; //-1 dersom ingen rom er ledige
  }

  public int finnAntallRom(){
    return romliste.size();
  }

  public int finnRomStrl(int indeks){
    return finnBestemtRomMedIndeks(indeks).getRomStørrelse();
  }

  public Rom finnBestemtRomMedIndeks(int indeks){
    return romliste.get(indeks);
  }

  public Rom finnBestemtRomMedNummer(int romnummer){ //Må sørge for at det fanges opp dersom rommet med romnr 0 kommer, da det betyr at det ikke finnes
      int indeks = -1;
      for (int i = 0; i < romliste.size(); i++) {
        if (romnummer == romliste.get(i).getRomNr()) {
          indeks = i;
        }
      }
      return romliste.get(indeks);
    }

  public String skrivutResMedRomnummer(int romnummer){
    String utskrift = finnBestemtRomMedNummer(romnummer).skrivUtReserveringer();
    return utskrift;
  }

  public static void main(String[] args){
    Konferansesenter ks = new Konferansesenter();
    System.out.println(ks.registrerRom(1, 11));
    System.out.println(ks.registrerRom(2, 30));
    System.out.println(ks.registrerRom(3, 45));
    Tidspunkt tid1 = new Tidspunkt(201902011330L);
    Tidspunkt tid2 = new Tidspunkt(201902011430L);
    Tidspunkt tid3 = new Tidspunkt(201902011530L);
    Tidspunkt tid4 = new Tidspunkt(201902011630L);
    ks.reserverRom(tid1, tid2, 8, "Martin", "502");
    ks.reserverRom(tid2, tid3, 8, "Ivar", "500");
    ks.reserverRom(tid3, tid4, 8, "Merete", "501");
    ks.reserverRom(tid1, tid2, 8, "Henrik", "503");
    System.out.println(ks.skrivutResMedRomnummer(2));


  }

}
