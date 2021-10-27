/**
 * Bok.java
 *
 */
public class Bok {

    private final String isbn;
    private final String tittel;
    private final String forfatter;

    /**
     * Konstruktør:
     * Isbn, tittel og forfatter må oppgis, de kan ikke være verken null eller tomme strenger.
     */
    public Bok(String isbn, String tittel, String forfatter) {
        this.isbn = isbn;
        this.tittel = tittel;
        this.forfatter = forfatter;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getTittel() {
        return tittel;
    }

    public String getForfatter() {
        return forfatter;
    }

    public String toString() {
        return isbn + ": " + forfatter + ", " + tittel;
    }
}
