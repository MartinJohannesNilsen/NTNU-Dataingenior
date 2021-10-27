import java.util.*;
import java.io.*;
class OppgaveOversikt{
  private Student[] studenter = new Student[5];
  private int antStud = 0;

  public boolean regNyStudent(String studentNavn){
    if(antStud == 0){
      Student NyStud = new Student(0, studentNavn);
      studenter[antStud] = NyStud;
      antStud++;
    }
    if(finnAntStud() == antStud){utvidTabell();}
    for(int i = 0; i<antStud; i++){
      if(studenter[i].getNavn() == studentNavn){
        return false;
      }
    }
    Student NyStud = new Student(0, studentNavn);
    studenter[antStud] = NyStud;
    antStud++;
    return true;
  }

  //hjelpemetode
  private void utvidTabell(){
    Student[] nyTab = new Student[studenter.length + 5];
    for (int i = 0; i < antStud; i++) {
      nyTab[i] = studenter[i];
    }
    studenter = nyTab;
  }

  public int finnAntStud(){
    int studTall = 0;
    for(int i = 0; i<studenter.length;i++){
      if(studenter[i] != null){studTall++;}
    }
    if(studTall != antStud){throw new IllegalArgumentException("Noe galt har skjedd med antStud");}
    return studTall;
  }

  public int finnAntOppgaver(String navn){
    for(int i = 0; i<antStud; i++){
      if(studenter[i].getNavn() == navn){
        return studenter[i].getAntOppg();
      }
    }
    return -1;
  }

  public boolean økAntOppg(String studentnavn, int nyttAntall){
    for(int i = 0; i<antStud; i++){
      if(studenter[i].getNavn() == studentnavn){
        if(nyttAntall<=studenter[i].getAntOppg()){
          return false;
        }else{
          studenter[i].setAntOppg(nyttAntall);
          return true;
        }
      }
    }return false;
  }

  public String[] finnAlleNavn(){ //Alle navn
    String[] nytab = new String[antStud];
    for(int i = 0; i<nytab.length; i++){
      nytab[i] = studenter[i].getNavn();
    }
    return nytab;
  }

  public String toString(){
    String utskrift = "";
    for(int i = 0; i<antStud; i++){
      utskrift += "\n" + studenter[i].toString();
    }
    return utskrift;
  }

  public static void main(String[] args){
    //Lager først et objekt
    OppgaveOversikt oversikt = new OppgaveOversikt();

    //Registrerer så studenter
    System.out.println(oversikt.regNyStudent("Martin")); //true
    System.out.println(oversikt.regNyStudent("Martin")); //false
    oversikt.regNyStudent("Iren");
    oversikt.regNyStudent("Andreas");
    oversikt.regNyStudent("An");
    oversikt.regNyStudent("Andre");

    //Tester finnAntStud()
    System.out.println(oversikt.finnAntStud()); // 1

    //Tester økAntOppg()
    oversikt.økAntOppg("Martin", 10);
    System.out.println(oversikt.studenter[0].toString()); //Martin har 10 oppgaver godkjent

    //Tester finnAntOppgaver()
    System.out.println(oversikt.finnAntOppgaver("Henrik")); // -1
    System.out.println(oversikt.finnAntOppgaver("Martin")); // 10

    //Tester at alt har blitt gjort riktig
    oversikt.økAntOppg("Iren", 2);
    oversikt.økAntOppg("Andreas", 5);
    System.out.println(oversikt.toString());
  }
}
