

class Sitte extends Tribune{
  private int[] antOpptatt;  // tabellstørrelse: antall rader

  public Sitte(String tribunenavn, int kapasitet, int pris, int[] antOpptatt){
    super(tribunenavn, kapasitet, pris);
    this.antOpptatt = antOpptatt; //Her må jeg se på hva jeg gjør med konstruktør ifht. tabellen antOpptatt
  }

  public int[] getAntOpptatt(){return antOpptatt;}

  public int finnAntallSolgteBilletter(){
    int solgteBilletter = 0;
    for(int i = 0; i<antOpptatt.length; i++){
      if(antOpptatt[i] != 0){
        solgteBilletter += antOpptatt[i];
      }
    }
    return solgteBilletter;
  }

  @Override
  public Billett[] kjøpBilletter(int antBilletter){
    Billett[] intBilletter = new Billett[antBilletter];
    int kapasitetPrRad = getKapasitet()/antOpptatt.length;
    int radMedPlass = -1;
    boolean avslutt = false;
    while(!avslutt){ //finne rad med plass først
        for(int i = 0; i<antOpptatt.length; i++){
            if(antOpptatt[i]+antBilletter <= kapasitetPrRad){
                radMedPlass=i;
                avslutt = true;
                break;
            }
        }
        if(radMedPlass==-1){
            System.out.println("Det er ingen plass");
            return intBilletter;
        }
    }
    for(int a = 0; a<antBilletter; a++){
        intBilletter[a] = new SitteplassBillett(getTribunenavn(), getPris(), radMedPlass, antOpptatt[radMedPlass]+a);
    }
    antOpptatt[radMedPlass] += antBilletter;
    return intBilletter;
  }


  public Billett[] kjøpBilletter(String[] kjøpere){
      for(int i = 0; i<kjøpere.length;i++){
          if(kjøpere[i] == null){throw new IllegalArgumentException("Kjøpertabellen er ikke riktig utfylt");}
      }
      return kjøpBilletter(kjøpere.length);
  }













}
