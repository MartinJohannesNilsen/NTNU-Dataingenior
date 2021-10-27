public class Valuta {
    private String navn;
    private double kursMotNorske;
    private int enhet;

    public Valuta(String navn, double kursMotNorske, int enhet){
        this.navn = navn;
        this.kursMotNorske = kursMotNorske;
        this.enhet = enhet;
    }

    public String getNavn() {
        return navn;
    }

    public double getKursMotNorske() {
        return kursMotNorske;
    }

    public int getEnhet() {
        return enhet;
    }


}
