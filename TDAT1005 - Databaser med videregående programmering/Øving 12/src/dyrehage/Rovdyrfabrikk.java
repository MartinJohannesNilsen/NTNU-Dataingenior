package dyrehage;

public class Rovdyrfabrikk{

    public SkandinaviskeRovdyr nyBinne(String navn, int ankommetDato, int fDato, String adresse, int antKull){
        return new Hunnindivid("Brunbjoern","Ursus arctos","Ursidae",ankommetDato, adresse, navn, fDato, false, true, antKull);
    }

    public SkandinaviskeRovdyr nyHannbjoern(String navn, int ankommetDato, int fDato, String adresse){
        return new Hannindivid("Brunbjoern","Ursus arctos","Ursidae",ankommetDato, adresse, navn, fDato, true, true);
    }

    public SkandinaviskeRovdyr nyUlvetispe(String navn, int ankommetDato, int fDato, String adresse, int antKull){
        return new Hunnindivid("Gråulv", "Canis lupus", "Canidae", ankommetDato, adresse, navn, fDato, false, true, antKull);
    }

    public SkandinaviskeRovdyr nyUlvehann(String navn, int ankommetDato, int fDato, String adresse){
        return new Hannindivid("Gråulv", "Canis lupus", "Canidae", ankommetDato, adresse, navn, fDato, true, true);
    }

}
