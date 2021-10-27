import java.util.*;
import java.io.*;
class Oppgave2{
  private ArrayList<Student> studenter = new ArrayList<Student>(); //Størrelse? Prøvde [int 5] men ga komp.feil
  private int antStud = 0;

  /*
  *Endrer til ArrayList
  *Endrer forløkker med student.size()
  *Endrer String parametere med navn til objekter (referansene er objekter i Arraylist)
  */

  public boolean regNyStudent(String navn){
    if(studenter.contains(navn)){
      return false;
    }else{
      studenter.add(new Student(0, navn)); //Hvordan skal jeg løse problem med navn?
      antStud++;
    }
    return true;
  }

  public int finnAntStud(){
    if(studenter.size() != antStud){throw new IllegalArgumentException("Noe galt har skjedd med antStud");}
    return studenter.size();
  }

  public int finnAntOppgaver(String navn){
    for(int i = 0; i<studenter.size(); i++){
      if(navn.equals(studenter.get(i).getNavn())){
        return studenter.get(i).getAntOppg();
      }
    }
    return -1;
  }

  public boolean økAntOppg(String studentnavn, int nyttAntall){
    for(int i = 0; i<studenter.size(); i++){
      if(studenter.get(i).equals(studentnavn)){
        studenter.get(i).setAntOppg(nyttAntall);
        return true;
      }
    }
    return false;
  }

  public String[] finnAlleNavn(){
    String[] nytab = new String[studenter.size()]; //parameter studenter.size()?
    for(int i = 0; i<nytab.length; i++){
      nytab[i] = studenter.get(i).getNavn();
    }
    //nytab = studenter.clone(); //Denne metoden skal egentlig fungere
    return nytab;
  }

  public String toString(){
    String utskrift = "";
    for(int i = 0; i<studenter.size(); i++){
      utskrift += studenter.get(i).toString();
    }
    return utskrift;
  }

  public static void main(String[] args){
    //Lager først et objekt
    Oppgave2 oversikt = new Oppgave2();

    //Registrerer så studenter
    System.out.println(oversikt.regNyStudent("Martin")); //true
    System.out.println(oversikt.regNyStudent("Martin")); //false
    oversikt.regNyStudent("Iren");
    oversikt.regNyStudent("Andreas");
    oversikt.regNyStudent("An");
    oversikt.regNyStudent("Andre");

    //Tester finnAntStud()
    System.out.println(oversikt.finnAntStud()); // 1

    //Tester finnAntOppgaver()
    System.out.println(oversikt.finnAntOppgaver("Henrik")); // -1
    System.out.println(oversikt.finnAntOppgaver("Martin")); // 10

    //Tester at alt har blitt gjort riktig
    oversikt.økAntOppg("Iren", 2);
    oversikt.økAntOppg("Andreas", 5);
    System.out.println(oversikt.toString());

  }
}

/*
for(int i = 0; i<studenter.size();i++){
  nytab.get(i).clone()
}
nytab.set(studenter.get(i).getNavn());
*/
