package dyrehage;

public class Dyregruppe extends Dyr{
    private String gruppeNavn;
    private int omtrentligAntall;

    public Dyregruppe(String norskNavn, String latNavn, String latFamilie, int ankommetDato, String adresse, String gruppenavn, int omtrentligAntall){
        super(norskNavn, latNavn, latFamilie, ankommetDato, adresse);
        this.gruppeNavn=gruppenavn;
        this.omtrentligAntall=omtrentligAntall;
    }

    public String getGruppeNavn() { return gruppeNavn; }
    public int getOmtrentligAntall() { return omtrentligAntall; }

    public void setGruppeNavn(String gruppeNavn) { this.gruppeNavn = gruppeNavn;  }
    public void setOmtrentligAntall(int omtrentligAntall) { this.omtrentligAntall = omtrentligAntall; }

    @Override
    public String getNorskNavn(){
        return "gruppe av " + super.getNorskNavn();
    }

    @Override
    public String toString(){
        return super.toString() + "\nGruppenavn: " + getGruppeNavn() + "\nOmtrentlig antall: " + getOmtrentligAntall();
    }

    public static void main(String[] args){
        Dyregruppe a = new Dyregruppe("A", "Ursus", "Ursus Else",1999 ,"Trondheim", "Dataing", 95);
        System.out.println(a.toString());
    }





}
