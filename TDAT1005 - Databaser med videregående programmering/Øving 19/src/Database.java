import java.sql.*;

@SuppressWarnings("Duplicates")
public class Database{
    private Connection forbindelse;

    public Database() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/TDAT1005?user=root&password=Mjn45005502";
        this.forbindelse = DriverManager.getConnection(url);
    }

    public Connection getForbindelse() {
        return forbindelse;
    }

    public void lukkForbindelse(){
        try{
            this.forbindelse.close();
        } catch(SQLException a){
            a.printStackTrace();
        }

    }

    public boolean regNyBok(Bok nyBok){
        String isbn = nyBok.getIsbn();
        String forfatter = nyBok.getForfatter();
        String tittel = nyBok.getTittel();
        Statement stmt;
        ResultSet res;

        try{
            //Først må jeg sjekke om de finnes fra før
            stmt = forbindelse.createStatement();
            res = stmt.executeQuery("SELECT isbn FROM boktittel WHERE isbn = '" + isbn + "';");

            if(res.next()) return false; //Dersom isbn finnes fra før vil res.next() returnere true, og metoden returnerer false

            //Registrerer så bøkene
            stmt = forbindelse.createStatement();
            stmt.executeUpdate("INSERT INTO boktittel(isbn, forfatter, tittel) VALUES('" + isbn + "','" + forfatter + "','" + tittel + "');");

            //Registrerer så eksemplar 1
            stmt = forbindelse.createStatement();
            stmt.executeUpdate("INSERT INTO eksemplar(isbn, eks_nr) VALUES('" + isbn + "', 1);");

        } catch (SQLException b){
            b.printStackTrace();
            return false;
        }
        /*
        finally{
            lukkForbindelse();
        }
        */
        return true;
    }

    public int regNyttEksemplar(String isbn){
        Statement stmt;
        ResultSet res;
        int ant = 0;

        try{
            stmt = forbindelse.createStatement();
            res = stmt.executeQuery("SELECT MAX(eks_nr) as maks FROM eksemplar where isbn = '" + isbn + "';");

            if(res.next()) {
                ant = res.getInt("maks");
                ant++;
            }

            //Registrerer så eksemplaret
            stmt.executeUpdate("INSERT INTO eksemplar(isbn, eks_nr) VALUES('" + isbn + "'," + ant + ");");

        } catch (SQLException b){
            b.printStackTrace();
            return 0;
        }
        /*
        finally{
            lukkForbindelse();
        }
        */
        return ant;
    }

    public boolean lånUtEksemplar(String isbn, String navn, int eksNr){
        Statement stmt;
        int raderPåvirket = 0;
        boolean utLånt = false;

        try{
            stmt = forbindelse.createStatement();
            raderPåvirket = stmt.executeUpdate("UPDATE eksemplar SET laant_av = '" + navn + "' WHERE isbn = '" + isbn + "' AND eks_nr = " + eksNr + ";");

            if(raderPåvirket != 0) return true;

        } catch (SQLException b){
            b.printStackTrace();
            return false;
        }
        /*
        finally{
            lukkForbindelse();
        }
        */
        return false;
    }
}

/*
Øvingen nevner noe med transaksjonshåndtering, noe som evnt kunne vært aktuelt på den metoden der den updater to tabeller
regNyBok(), fordi denne burde ikke gjennomføre nummer to dersom nummer en ikke går gjennom. Har du ikke registrert en bok,
bør du heller ikke registre et eksemplar av denne.
 */

//connection.setAutoCommit(true);
//Connection.commit()
//Connection.rollback()