import java.io.Serializable;
import java.util.Arrays;

abstract class Tribune implements Serializable, Comparable<Tribune> {
  private final String tribunenavn;
  private final int kapasitet;
  private final int pris;

  public Tribune(String tribunenavn, int kapasitet, int pris){
    this.tribunenavn = tribunenavn;
    this.kapasitet = kapasitet;
    this.pris = pris; 
  }

  public String getTribunenavn(){return tribunenavn;}
  public int getKapasitet(){return kapasitet;}
  public int getPris(){return pris;}

  abstract int finnAntallSolgteBilletter();

  public int finnInntekt(){
    return finnAntallSolgteBilletter() * getPris();
  }

  abstract Billett[] kjøpBilletter(int antallBilletter);
  abstract Billett[] kjøpBilletter(String[] kjøpere);

  public String toString() {
    return "Her kommer info om " + getTribunenavn() + "\nKapasitet: " + getKapasitet() + "\nAntall solgte billetter: " + finnAntallSolgteBilletter() + "\nInntekt " + finnInntekt();
  }

  @Override
  public int compareTo(Tribune o){
    if(o == null){throw new IllegalArgumentException("Objektet er null");}
    if(finnInntekt() == o.finnInntekt()){
      return 0;
    }else if(finnInntekt() > o.finnInntekt()){
      return -1;
    }
    return 1;
  }







}
