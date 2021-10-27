import java.io.*;
import java.util.*;
class Rom{
  private ArrayList<Reservasjon> reservasjonsliste = new ArrayList<Reservasjon>();
  private final int romNummer;
  private int romStørrelse;

  public Rom(int romNummer, int romStørrelse){
    this.romNummer = romNummer;
    this.romStørrelse = romStørrelse;
  }

  public int getRomNr(){
    return romNummer;
  }

  public int getRomStørrelse(){
    return romStørrelse;
  }

  public void setRomStørrelse(int nyStørrelse){
    this.romStørrelse = nyStørrelse;
  }

  public boolean sjekkOverLapp(Tidspunkt fraTid, Tidspunkt tilTid){
    for(int i = 0; i<reservasjonsliste.size(); i++){
      if(reservasjonsliste.get(i).overlapp(fraTid, tilTid)){
        return true; //Dersom overlapp
      }
    }
    return false; //Dersom ikke overlapp
  }

  public void reservering(Tidspunkt tidFra, Tidspunkt tidTil, Kunde kunde){
      Reservasjon res = new Reservasjon(tidFra, tidTil, kunde);
      reservasjonsliste.add(res);
  }

  public String skrivUtReserveringer(){
    String utskrift = "";
    for(int i = 0; i<reservasjonsliste.size(); i++){
      utskrift += "- " + reservasjonsliste.get(i).toString() + "\n";
    }
    return utskrift;
  }

  public Reservasjon returnRes(){ //prøver denne metoden som hjelp for konfSenter
    return reservasjonsliste.get(1);
  }


  public static void main(String[] args){

    Rom rom = new Rom(0,0);
    rom.reservering(new Tidspunkt(201901011230L), new Tidspunkt(201901011330L), new Kunde("Martin", "45005502"));
    rom.reservering(new Tidspunkt(201901011330L), new Tidspunkt(201901011430L), new Kunde("Ivar", "45005500"));
    System.out.println(rom.skrivUtReserveringer());
    System.out.println(rom.sjekkOverLapp(new Tidspunkt(201901011330L), new Tidspunkt(201901011430L))); //true

  }

}
