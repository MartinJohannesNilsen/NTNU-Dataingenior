package dyrehage;

public class Hunnindivid extends Individ{
    private int antKull;

    public Hunnindivid(String norskNavn, String latNavn, String latFamilie, int ankommetDato, String adresse, String navn, int fdato, boolean hanndyr, boolean farlig, int antKull){
        super(norskNavn, latNavn, latFamilie, ankommetDato, adresse, navn, fdato, hanndyr, farlig);
        this.antKull=antKull;
    }

    public int getAntKull(){return antKull;}
    public void leggTilKull(int antall){
        antKull+=antall;
    }
    public void leggTilNyttKull(){
        antKull++;
    }

    @Override
    public String toString(){
        return super.toString() + "\nKull: " + getAntKull();
    }

    @Override
    public boolean erHanndyr() { return false; }




}
