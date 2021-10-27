import static javax.swing.JOptionPane.*;
class Bord{
    private String[] bordOversikt;
    private int antallBord;

    public Bord(int antall){
      this.antallBord = antall;
      this.bordOversikt = new String[antallBord];
    }

    public void reserverBord(int bordNummer, String navn){
      this.bordOversikt[bordNummer] = navn;
    }

    public void frigiBord(int bordNummer){
      bordOversikt[bordNummer] = null;
    }

    public int finnAntallLedigeBord(){
      int teller = 0;
      for(int i = 0; i<bordOversikt.length; i++){
        if(bordOversikt[i] == null){
          teller++;
        }
      }
      return teller;
    }

    public int finnAntallOpptatteBord(){
      return antallBord - finnAntallLedigeBord();
    }

    //lager en hjelpetabell med indexene til ledige bord, brukes til reservering av bord
    private int[] ledigeBord(){
      int[] ledig = new int[finnAntallLedigeBord()];
      int teller = 0;
      for(int i = 0; i < ledig.length; i++){
        if(bordOversikt[i] == null){
          ledig[teller] = i;
          teller++;
        }
      }
      return ledig;
    }

    public int[] finnBestemtReservasjon(String navn){
      int teller = 0;
      for(int i = 0; i < antallBord; i++){
        if(bordOversikt[i] == navn){
          teller++;
        }
      } //Har nå en tellervariabel med antall bord "navn" har reservert
      int[] reservasjon = new int[teller];
      int resteller = 0;
      for(int i = 0; i < antallBord; i++){
        if(bordOversikt[i] == navn){
          reservasjon[resteller] = i;
          resteller++;
        }
      } //tabellen inneholder nå alle bordnumrene "navn" har reservert
      return reservasjon;
    }

    public boolean frigitt(int[] rydda){
      try{
        for (int i = 0; i<rydda.length; i++) {
          bordOversikt[rydda[i]] = null;
        }
        return true;
      }catch(Exception e){return false;}
    }
}
