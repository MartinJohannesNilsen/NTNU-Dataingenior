import java.io.*;
import java.util.*;
import static javax.swing.JOptionPane.*;
class Brukergrensesnitt{
  Konferansesenter konfSenter = new Konferansesenter();

  public Brukergrensesnitt(){}

  public void førsteReg(){
    boolean avslutt = false;
    while(!avslutt && true){
      showMessageDialog(null, "Du skal nå registrere rom nr. " + (konfSenter.finnAntallRom()+1));
      String innlestStrl = showInputDialog(null, "Hvor mange personer er det plass til i dette rommet?");
      int strl = Integer.parseInt(innlestStrl);
      if(!konfSenter.registrerRom(konfSenter.finnAntallRom(), strl)){showMessageDialog(null, "Fyll inn et gyldig tall");}
      String[] valg = {"Registrer nytt rom", "Avslutt"};
      int valgBoks = showOptionDialog(null, "Vil du registrere flere rom?", "Ferdig?", YES_NO_OPTION, QUESTION_MESSAGE, null, valg, valg[0]);
      switch(valgBoks){
      case 0: //registrer nytt rom
        break;
      case 1:
        avslutt = true;
        break;
      }
    }
    String skrivUt = "";
    int størrelse = konfSenter.finnAntallRom();
    for(int i = 0; i<størrelse; i++){
      skrivUt += "Rom " + (konfSenter.finnBestemtRomMedIndeks(i).getRomNr()+1) + " har plass til " + (konfSenter.finnRomStrl(i)) + " personer \n";
    }
    showMessageDialog(null, skrivUt);
  } //Var tenkt å gi meg muligheten til å registrere rom men fungerer ikke, og gidder ikke bruke tid på det

  public void lesReservasjoner(){
    boolean avsluttReservasjoner = false;
    String[] valgReservasjon = {"Registrer reservasjon", "Avslutt"};
    int valgBoksRes = showOptionDialog(null, "Reserveringsverktøy", "Ferdig?", YES_NO_OPTION, QUESTION_MESSAGE, null, valgReservasjon, valgReservasjon[0]);
    while(!avsluttReservasjoner && true){
      switch(valgBoksRes){
      case 0://Reservasjon
        //Starttidspunkt
        String startInput = showInputDialog("Skriv inn starttidspunktet for reservasjonen\npå formen \"ttmm-dd-mm-åååå\"\nEks: 1230-01-01-2020");
        String[] startInputTilLong = startInput.split("-");
        String startRiktigRekkefølge = startInputTilLong[3]+startInputTilLong[2]+startInputTilLong[1]+startInputTilLong[0];
        Long startInputLong = Long.parseLong(startRiktigRekkefølge);
        Tidspunkt startTidspunkt = new Tidspunkt(startInputLong);
        //Sliuttidspunkt
        String sluttInput = showInputDialog("Skriv inn sluttidspunktet for reservasjonen\npå formen \"ttmm-dd-mm-åååå\"\nEks: 1330-01-01-2020");
        String[] sluttInputTilLong = sluttInput.split("-");
        String sluttRiktigRekkefølge = sluttInputTilLong[3]+sluttInputTilLong[2]+sluttInputTilLong[1]+sluttInputTilLong[0];
        Long sluttInputLong = Long.parseLong(sluttRiktigRekkefølge);
        Tidspunkt sluttTidspunkt = new Tidspunkt(sluttInputLong);
        //antPersoner
        String antPersonerString = showInputDialog("Skriv inn antall personer det må være plass til");
        int antPersoner = Integer.parseInt(antPersonerString);
        //navn og telefonnummer
        String navn = showInputDialog("Skriv inn navnet på reservasjonen");
        String tlf = showInputDialog("Skriv inn telefonnummer på reservasjonen");
        if(!konfSenter.reserverRom(startTidspunkt, sluttTidspunkt, antPersoner, navn, tlf)){
          showMessageDialog(null, "Det var ikke mulig å reservere til dette tidspunktet");
          break;
        }else{
          showMessageDialog(null, "Reservasjon registrert!");}
          //Får nå opp et valg om å reservere på nytt eller ikke
          String[] valg3 = {"Registrer ny reservasjon", "Avslutt"};
          int valgBoks3 = showOptionDialog(null, "Reserveringsverktøy", "Ferdig?", YES_NO_OPTION, QUESTION_MESSAGE, null, valg3, valg3[0]);
          switch(valgBoks3){
          case 0:
            break;
          case 1:
            avsluttReservasjoner = true;
            break;
          }
        break;
      case 1: //Avslutt
        avsluttReservasjoner = true;
        break;
      }
    }
  }

  public void spørKlient(){
    boolean avsluttSpør = false;
    String[] valgSpør = {"Vil du skrive ut rominfo?", "Avslutt"};
    int valgBoksSpør = showOptionDialog(null, "Rominformasjon", "Ferdig?", YES_NO_OPTION, QUESTION_MESSAGE, null, valgSpør, valgSpør[0]);
    while(!avsluttSpør && true){
      switch(valgBoksSpør){
      case 0://Skrivut
        String romString = showInputDialog("Skriv inn romnummer:");
        int romInt = Integer.parseInt(romString);
        showMessageDialog(null, skrivUtAllInfoOmRom(romInt));
        //Spør på nytt
        String[] valgSpør2 = {"Skrive ut ny info", "Avslutt"};
        int valgBoksSpør2 = showOptionDialog(null, "Rominformasjon", "Ferdig?", YES_NO_OPTION, QUESTION_MESSAGE, null, valgSpør2, valgSpør2[0]);
        switch(valgBoksSpør2){
        case 0:
          break;
        case 1:
          avsluttSpør = true;
          break;
        }
        break;
      case 1: //Avslutt
        avsluttSpør = true;
        break;
      }
    }
  }

  private String skrivUtAlleReserveringer(){
    String utskrift = "";
    for(int i = 0; i<konfSenter.finnAntallRom(); i++){
      utskrift += "\nReservasjoner for rom " + (i+1) + ":\n";
      utskrift += konfSenter.skrivutResMedRomnummer(i+1);
    }
    return utskrift;
  }

  private String skrivUtAlleReservasjonerForRomNummer(int romnummer){
    String utskrift = "";
    utskrift += "Reservasjoner for rom " + romnummer + ":\n";
    utskrift += konfSenter.skrivutResMedRomnummer(romnummer);
    return utskrift;
  }

  public String skrivUtAllInfoOmRom(int romnummer){
    String utskrift = "";
    utskrift += "Rom " + konfSenter.finnBestemtRomMedNummer(romnummer).getRomNr() + " av " + konfSenter.finnAntallRom() + ":\n";
    utskrift += "Antall plasser: " + konfSenter.finnBestemtRomMedNummer(romnummer).getRomStørrelse() + "\n";
    utskrift += skrivUtAlleReservasjonerForRomNummer(romnummer);
    return utskrift;
  }

  public static void main(String[] args){
    Brukergrensesnitt bgs = new Brukergrensesnitt();
    //bgs.førsteReg(); //Denne fungerer ikke, men er ikke et krav så dropper den
    bgs.konfSenter.registrerRom(1, 9);
    bgs.konfSenter.registrerRom(2, 18);
    bgs.konfSenter.registrerRom(3, 27);
    bgs.konfSenter.registrerRom(4, 36);
    bgs.konfSenter.registrerRom(5, 45);
    bgs.konfSenter.registrerRom(6, 54);
    bgs.konfSenter.registrerRom(7, 63);
    bgs.konfSenter.registrerRom(8, 72);
    bgs.konfSenter.registrerRom(9, 81);
    bgs.lesReservasjoner();
    //Skriver ut all info i konsollen
    for(int i = 1; i<10; i++){
      System.out.println(bgs.skrivUtAllInfoOmRom(i));
    }
    bgs.spørKlient();





/*
    //Testprogram
    bgs.konfSenter.registrerRom(1, 8);
    bgs.konfSenter.registrerRom(2, 10);
    bgs.konfSenter.reserverRom(new Tidspunkt(202001011000L), new Tidspunkt(202001011100L), 8 , "Martin", "45005502");
    bgs.konfSenter.reserverRom(new Tidspunkt(202001011000L), new Tidspunkt(202001011100L), 8 , "Martin", "45005502");
    bgs.konfSenter.reserverRom(new Tidspunkt(202001012000L), new Tidspunkt(202001012200L), 8 , "Martin", "45005502");
    System.out.println("Skriver nå ut alle reservasjoner" + "\n---------------------");
    System.out.println(bgs.skrivUtAlleReserveringer());
    System.out.println("\n---------------------" + "\nSkriver nå ut alle reservasjoner for rom 1" + "\n---------------------");
    System.out.println(bgs.skrivUtAlleReservasjonerForRomNummer(1));
    System.out.println("---------------------" + "\nSkriver nå ut all info for rom 1" + "\n---------------------");
    System.out.println(bgs.skrivUtAllInfoOmRom(1));
*/
  }
}
