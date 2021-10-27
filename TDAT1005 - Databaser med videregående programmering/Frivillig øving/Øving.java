import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.*;
import java.io.*;
import static javax.swing.JOptionPane.*;

class Øving{

  public static String[] LesinnISBN(){
    String[] valg = {"Les inn kode", "Avslutt"};
    String[] string = new String[2];
    int valgBoks = showOptionDialog(null, "Vil du lese inn kode?", "input", YES_NO_OPTION, INFORMATION_MESSAGE, null, valg, valg[0]);
    switch(valgBoks){
    case 0:
      String input = showInputDialog("Skriv inn kode");
      string[0] = "select forfatter, tittel from boktittel where isbn = '" + input + "';";
      string[1] = "select count(*) antall from eksemplar where isbn = '" + input + "';";
      break;
    case 1:
      break;
    }
    return string;
  }

  public static void main(String[] args) throws Exception {

      System.out.println("Starter opp...");
      String url = "jdbc:mysql://root:Mjn45005502@127.0.0.1:3306/TDAT1005";
      try(Connection con = DriverManager.getConnection(url);) {

      String[] stringInput = LesinnISBN();
      String stringEn = stringInput[0];
      String stringTo = stringInput[1];

      Statement stmt = con.createStatement();
      ResultSet res = stmt.executeQuery(stringEn);

      while (res.next()) {
        System.out.println("Forfatter(e): " + res.getString("forfatter") + "\nTittel: " + res.getString("tittel"));
      }

      res = stmt.executeQuery(stringTo);

      while (res.next()) {
        System.out.println("Eksemplarer: " + res.getString("antall"));
      }

      //Må lukke strømmen til databasen
      con.close();
      }catch (Exception sq) {
    	  System.out.println("SQL-Feil: " + sq);
      }


  }
}
