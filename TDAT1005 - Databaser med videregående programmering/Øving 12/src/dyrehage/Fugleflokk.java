package dyrehage;

public class Fugleflokk extends Dyregruppe {
    private double gjVektVoksenArt;
    private boolean svømmeFugl;

    public Fugleflokk(String norskNavn, String latNavn, String latFamilie, int ankommetDato, String adresse, String gruppenavn, int omtrentligAntall, double gjVektVoksenArt, boolean svømmeFugl){
        super(norskNavn, latNavn, latFamilie, ankommetDato, adresse, gruppenavn, omtrentligAntall);
        this.gjVektVoksenArt=gjVektVoksenArt;
        this.svømmeFugl=svømmeFugl;
    }

    public double getGjVektVoksenArt() { return gjVektVoksenArt; }
    public boolean erSvømmeFugl() { return svømmeFugl; }

    public String finnSvømmeFulg(){
        if(erSvømmeFugl()) {return "Svømmefulg";}
        else return "Ikke svømmefugl";
    }

    @Override
    public String toString(){
        return super.toString() + "\nGjennomsnittsvekt på voksen art: " + getGjVektVoksenArt() + "\nType: " + finnSvømmeFulg();
    }









}
