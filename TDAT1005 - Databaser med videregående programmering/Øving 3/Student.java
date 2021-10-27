class Student{
  private final String navn;
  private int antOppg; //ant godkjente oppgaver

  public Student(int antOppg, String navn){
    this.navn = navn;
    this.antOppg = antOppg;
  }

  public String getNavn(){
    //if(navn == null)return "Tom";
    return navn;}

  public int getAntOppg(){return antOppg;}

  public void setAntOppg(int nyAntOppg){
    if(nyAntOppg<0){
      throw new IllegalArgumentException("Du kan ikke ha et negativt antall godkjente oppgaver!");
    }else{
      this.antOppg = nyAntOppg;
    }
  }

  public String toString(){
    return navn + " har " + antOppg + " oppgaver godkjent.";
  }

  public static void main(String[] args){
    Student Martin = new Student(2, "Martin");
    System.out.println(Martin.getNavn());
    System.out.println(Martin.getAntOppg());
    //Martin.setAntOppg(-1);
    Martin.setAntOppg(3);
    System.out.println(Martin.toString());
  }
}
