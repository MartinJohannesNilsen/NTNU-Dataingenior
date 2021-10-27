import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
class Restaurant{
  private String navn;
  private final int etablering;
  private Bord bordListe;

  public Restaurant(String navn, int etablering, int antBord){
    this.bordListe = new Bord(antBord);
    this.navn = navn;
    this.etablering = etablering;
  }

  public String getRestaurantNavn(){return navn;}
  public void setRestaurantNavn(String navn){this.navn = navn;}
  public int getEtablering(){return etablering;}

  public int getRestaurantAlder(){
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy");
  	LocalDateTime now = LocalDateTime.now();
  	String dagensDato = dtf.format(now);
    int dato = Integer.parseInt(dagensDato);
    return dato - etablering;
  }

  public int getAntLedigeBord(){
    return bordListe.finnAntallLedigeBord();
  }

  public int getAntOpptatteBord(){
    return bordListe.finnAntallOpptatteBord();
  }

  public boolean reserverBord(int antall, String navn){
    try{
      int antBord = bordListe.finnAntallLedigeBord() + bordListe.finnAntallOpptatteBord();
      if (antall>antBord) {
        return false;
      }
      int[] kom = bordListe.ledigeBord(); //Først lager jeg en tabell
      for(int i = 0; i < antall; i++){
        bordListe.reserverBord(kom[i],navn);
      }
      return true;
    }catch(Exception e){
      return false;
    }
  }

  public int[] getBestemtReservasjon(String navn){
    return bordListe.finnBestemtReservasjon(navn);
  }

  public boolean frigiBord(int[] rydda){
    //bordListe.frigitt(rydda);
    if(!bordListe.frigitt(rydda)){return false;}
    return true;
  }
}
