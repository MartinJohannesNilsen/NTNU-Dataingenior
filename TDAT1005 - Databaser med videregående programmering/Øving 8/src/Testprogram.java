import java.io.*;
import java.util.Arrays;

public class Testprogram implements Serializable{
  public static void main(String[] args) throws IOException, ClassNotFoundException {
      int[] opptatt = {1, 3, 4, 2, 0}; //5 rader og 10 plasser opptatt = 90 ledige seter.
      int[] vipOpptatt = {3, 3, 3, 0};
      String[][] tilskuer = new String[4][3];
      Staa staaTribune = new Staa("Ståtribune A", 50, 50, 25); //25 flere billetter tilgjengelig
      Staa staaTribune2 = new Staa("Ståtribune B", 50, 50, 0);
      Sitte sitteTribune = new Sitte("Sittetribune A", 100, 100, opptatt);
      VIP vipTribune = new VIP("VipTribune A", 12, 350, vipOpptatt, tilskuer);

      //legger inn alle Tribunene i Tribune[];
      Tribune[] tribuneOversikt = {staaTribune, staaTribune2, sitteTribune, vipTribune};


      String[] kjøpere = {"Martin", "Jonas", "Max"};
      //String[] kjøpere2 = {"Simon", "Kristian", "Thomas", "Zaim"};
      //kjøper billetter på alle tribunene og skriver ut
      Billett[] førsteKjøp = tribuneOversikt[0].kjøpBilletter(5);
      System.out.println("Her kommer første billettkjøp (5)");
      for(int i = 0; i<førsteKjøp.length; i++){
          System.out.println(førsteKjøp[i]);
      }

      Billett[] andreKjøp = tribuneOversikt[1].kjøpBilletter(kjøpere);
      System.out.println("\nHer kommer andre billettkjøp (3)");
      for(int j = 0; j<andreKjøp.length; j++){
          System.out.println(andreKjøp[j]);
      }

      Billett[] tredjeKjøp = tribuneOversikt[2].kjøpBilletter(kjøpere);
      System.out.println("\nHer kommer tredje billettkjøp (3)");
      for(int j = 0; j<tredjeKjøp.length; j++){
          System.out.println(tredjeKjøp[j]);
      }

      Billett[] fjerdeKjøp = tribuneOversikt[2].kjøpBilletter(17);
      System.out.println("\nHer kommer fjerde billettkjøp (17)");
      for(int j = 0; j<fjerdeKjøp.length; j++){
          System.out.println(fjerdeKjøp[j]);
      }

      System.out.println("\nHer kommer femte billettkjøp: ");
      Billett[] femteKjøp = tribuneOversikt[3].kjøpBilletter(2); //Bør returnere "Du kan ikke kjøpe VIP-Billetter uten navn!"


      System.out.println("\nHer kommer sjette billettkjøp (3)");
      Billett[] sjetteKjøp = tribuneOversikt[3].kjøpBilletter(kjøpere);
      for(int j = 0; j<sjetteKjøp.length; j++){
          System.out.println(sjetteKjøp[j]);
      }

      //Her skal jeg skrive ut info om hver tribune
      for(int i = 0; i<tribuneOversikt.length; i++){
          System.out.println("\n" + tribuneOversikt[i].toString());
      }

      //Nå skal jeg sortere tribuneOversikt etter inntekt
      System.out.println("\nHer kommer tribuneOversikt sortert etter inntekt:");
      Arrays.sort(tribuneOversikt);
      for(int i = 0; i<tribuneOversikt.length; i++){
          System.out.println(tribuneOversikt[i].getTribunenavn() + ", med inntekt: " + tribuneOversikt[i].finnInntekt());
      }

      //Nå skal jeg skrive til fil
      skrivTilFil(tribuneOversikt);

      //Nå skal jeg hente inn fra fil
      Tribune[] t = skrivFraFil();
      System.out.println("\nHer kommer skrivFraFil");
      for(int i = 0; i<t.length; i++){
          System.out.println(t[i].getTribunenavn());
      }
  }

  static void skrivTilFil(Tribune[] tribune) throws IOException {
      FileOutputStream fos = new FileOutputStream("fil.ser");
      ObjectOutputStream oos = new ObjectOutputStream(fos);
      oos.writeObject(tribune);
      oos.close();
  }

  static Tribune[] skrivFraFil() throws IOException, ClassNotFoundException {
      FileInputStream fis = new FileInputStream("fil.ser");
      ObjectInputStream ois = new ObjectInputStream(fis);
      Tribune[] innlest = (Tribune[]) (ois.readObject());
      ois.close();
      return innlest;
  }
}
