package dyrehage;

import java.util.Calendar;

abstract class Individ extends Dyr implements SkandinaviskeRovdyr{
    private String navn;
    private final int fdato;
    private boolean hanndyr;
    private boolean farlig;


    public Individ(String norskNavn, String latNavn, String latFamilie, int ankommetDato, String adresse, String navn, int fdato, boolean hanndyr, boolean farlig){
        super(norskNavn, latNavn, latFamilie, ankommetDato, adresse);
        this.navn = navn;
        this.fdato = fdato;
        this.hanndyr = hanndyr;
        this.farlig = farlig;
    }

    public String getNavn() { return navn; }
    public int getFdato() { return fdato; }
    public int getAlder() {return Calendar.getInstance().get(Calendar.YEAR)-getFdato();}
    public String getAdresse() {return super.getAdresse();}
    public void flytt(String nyAdresse){super.setAdresse(nyAdresse);}
    public String skrivUtInfo(){return toString();}
    public int getAntKull(){return 0;}
    public void leggTilKull(int antall){throw new IllegalArgumentException("Feil klasse");}
    public void leggTilNyttKull(){throw new IllegalArgumentException("Feil klasse");}


    public boolean erHanndyr() { return hanndyr; }
    public boolean erFarlig() { return farlig; }

    public String finnKjønn(){
        if(erHanndyr()){return "Hannkjønn";}
        else return "Hunnkjønn";
    }

    public String finnFarlig(){
        if(erFarlig()){return "Farlig";}
        else return "Ufarlig";
    }

    @Override
    public String toString(){
        return super.toString() + "\nIndividnavn: " + getNavn() + "\nFødt: " + getFdato() + "\nKjønn: " + finnKjønn() + "\nType: " + finnFarlig();
    }

}
