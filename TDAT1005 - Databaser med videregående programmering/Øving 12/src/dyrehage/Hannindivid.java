package dyrehage;

public class Hannindivid extends Individ{
    public Hannindivid(String norskNavn, String latNavn, String latFamilie, int ankommetDato, String adresse, String navn, int fdato, boolean hanndyr, boolean farlig){
        super(norskNavn, latNavn, latFamilie, ankommetDato, adresse, navn, fdato, hanndyr, farlig);
    }

    public int getAntKull(){return 0;}

    @Override
    public boolean erHanndyr() { return true; }

}
