

class Staa extends Tribune {
  private int antSolgteBilletter;

  public Staa(String tribunenavn, int kapasitet, int pris, int antSolgteBilletter){
    super(tribunenavn, kapasitet, pris);
    this.antSolgteBilletter = antSolgteBilletter;
  }

  public int getAntSolgteBilletter(){return antSolgteBilletter;}

  public int finnAntallSolgteBilletter(){
    return antSolgteBilletter;
  }

  @Override
  public Billett[] kjøpBilletter(int antBilletter){
    Billett[] intBilletter = new Billett[antBilletter];
    if(getKapasitet()>=antBilletter){
      for(int i = 0; i<antBilletter; i++){
        intBilletter[i] = new StaaplassBillett(getTribunenavn(), getPris());
      }
    }
    antSolgteBilletter += antBilletter;
    return intBilletter;
  }

  public Billett[] kjøpBilletter(String[] kjøpere){
    if(kjøpere == null){throw new IllegalArgumentException("kjøpere kan ikke være null"); }
    int antKjøpere = 0;
    for(int i = 0; i<kjøpere.length; i++){
      if(kjøpere[i] != null){
        antKjøpere++;
      }
    }
    return kjøpBilletter(antKjøpere);
  }

}
