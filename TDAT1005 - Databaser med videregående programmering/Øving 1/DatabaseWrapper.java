import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;

class DatabaseWrapper {

  public static void main(String[] args) throws Exception {
      System.out.println("Starter opp...");
      String password = "wrq71s2w";
      String url = "jdbc:mysql://mysql.stud.idi.ntnu.no:3306/martijni?user=martijni&password=wrq71s2w";
      try(Connection con = DriverManager.getConnection(url);) {

      Statement stmt = con.createStatement();
      ResultSet res = stmt.executeQuery("SELECT * FROM Team_15 ORDER BY Fornavn");

      while (res.next()) {
        System.out.println("Fornavn: " + res.getString("fornavn") + "\nEtternavn: " + res.getString("etternavn"));
      }

      //Må lukke strømmen til databasen
      con.close();
      }catch (Exception sq) {
    	  System.out.println("SQL-Feil: " + sq);
      }


  }
}
