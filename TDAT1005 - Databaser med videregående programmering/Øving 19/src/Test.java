import java.sql.SQLException;

public class Test {
    public static void main(String[] args) throws SQLException {
        Database database = new Database();
        Bok testbok = new Bok("12345", "Jonas eventyr", "Martin Nilsen");
        System.out.println(database.regNyBok(testbok));
        System.out.println(database.regNyttEksemplar("12345"));
        System.out.println(database.lånUtEksemplar("12345", "Jonas", 1));
        database.lukkForbindelse();
    }
}
