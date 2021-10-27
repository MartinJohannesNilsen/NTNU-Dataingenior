package dyrehage;

public class Fiskestim extends Dyregruppe{
    private double gjLengde;
    private boolean kanDeleAkvarium;

    public Fiskestim(String norskNavn, String latNavn, String latFamilie, int ankommetDato, String adresse, String gruppenavn, int omtrentligAntall, double gjLengde, boolean kanDeleAkvarium){
        super(norskNavn, latNavn, latFamilie, ankommetDato, adresse, gruppenavn, omtrentligAntall);
        this.gjLengde=gjLengde;
        this.kanDeleAkvarium=kanDeleAkvarium;
    }

    public double getGjLengde() { return gjLengde; }
    public boolean getKanDeleAkvarium() { return kanDeleAkvarium; }

    public String finnKanDeleAkvarium(){
        if(getKanDeleAkvarium()) {return "Kan dele akvarium";}
        else return "Kan ikke dele akvarium";
    }

    @Override
    public String toString(){
        return super.toString() + "\nGjennomsnittslengde: " + getGjLengde() + "\nDeling av akvarium: " + finnKanDeleAkvarium();
    }




}
