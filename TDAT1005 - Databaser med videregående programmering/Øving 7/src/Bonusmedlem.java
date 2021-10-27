import java.time.*;
import java.time.temporal.ChronoUnit;

class Bonusmedlem{
  private final int medlNr;
  private final Personalia pers;
  private final LocalDate innmeldtDato;
  private int poeng = 0;

  public Bonusmedlem(int medlNr, Personalia pers, LocalDate innmeldtdato){
    this.medlNr = medlNr;
    this.pers = pers;
    this.innmeldtDato = innmeldtdato;
  }

  public int getMedlNr(){
  	return medlNr;
  }

  public Personalia getPersonalia(){
  	return pers;
  }

  public LocalDate getInnmeldt(){
    return innmeldtDato;
  }

  public int getPoeng(){
    return poeng;
  }

//Skal en ta med gull eller sølv i denne metoden?
  public int finnKvalPoeng(LocalDate date2){
    long dagerMellom = ChronoUnit.DAYS.between(innmeldtDato, date2);
    if(dagerMellom > 365) {
      return 0;
    }
    return getPoeng();
  }

  public boolean okPassord(String passord){
    if(passord == null){
      throw new IllegalArgumentException("Du kan ikke ha et tomt passord");
    }
    return pers.okPassord(passord);
  }

  public boolean registrerPoeng(int poeng){
    if(poeng <= 0) return false;
    this.poeng += poeng;
    return true;
  }

  public static void main(String[] args){
    Personalia ole = new Personalia("Olsen", "Ole", "ole.olsen@dot.com", "ole");
    LocalDate testdato = LocalDate.of(2008, 2, 10);
    Bonusmedlem Ole = new Bonusmedlem(1, ole, testdato);
    if(Ole.okPassord("ole"))System.out.println("Passord ok");
    if(!Ole.okPassord("Olk"))System.out.println("Passord ikke ok");
    if(Ole.registrerPoeng(1000))System.out.println("Registrert");
    if(!Ole.registrerPoeng(0))System.out.println("Ikke registrert");
    LocalDate test = LocalDate.of(2009, 2, 10);
    if(Ole.finnKvalPoeng(test) == 0) System.out.println("For sent");
  }
}
