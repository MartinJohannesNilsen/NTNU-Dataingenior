import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Random;

public class Medlemsarkiv{
    private ArrayList<Bonusmedlem> medlemsListe = new ArrayList<>();

    public int nyMedlem(Personalia pers, LocalDate innmeldtdato){
        int medlemsNummer = finnLedigNr();
        Basicmedlem nyttMedlem = new Basicmedlem(medlemsNummer, pers, innmeldtdato);
        medlemsListe.add(nyttMedlem);
        return medlemsNummer;
    }

    private int finnLedigNr(){
        int tall = 0;
        boolean avslutt = false;
        while(!avslutt) {
            tall = new Random().nextInt(999999);
            for(int i = 0; i<medlemsListe.size(); i++){
                if(medlemsListe.get(i).getMedlNr() == tall) {
                    tall = -1;
                }
            }
            if(tall>=0) {avslutt = true;}
        }
        return tall;
    }

    public int finnPoeng(int medlemsnummer, String passord){
        for(int i = 0; i<medlemsListe.size();i++){
            if(medlemsListe.get(i).getMedlNr() == medlemsnummer && medlemsListe.get(i).okPassord(passord)){
                return medlemsListe.get(i).getPoeng();
            }
        }
        return 0;
    }

    public boolean registrerPoeng(int medlemsnummer, int poeng){
        for(int i = 0; i<medlemsListe.size(); i++) {
            if(medlemsListe.get(i).getMedlNr() == medlemsnummer){
                medlemsListe.get(i).registrerPoeng(poeng);
                return true;
            }
        }
        return false;
    }

    public void sjekkMedlemmer() {
        for (int i = 0; i < medlemsListe.size(); i++) {
            //Oppgradering fra basic til sølv
            if (medlemsListe.get(i).getPoeng() > 25000 && medlemsListe.get(i).getPoeng() < 75000 && medlemsListe.get(i) instanceof Basicmedlem) {
                Soelvmedlem nySoelv = new Soelvmedlem(medlemsListe.get(i).getMedlNr(), medlemsListe.get(i).getPersonalia(), medlemsListe.get(i).getInnmeldt(), medlemsListe.get(i).getPoeng());
                medlemsListe.set(i, nySoelv);
            }
            if (medlemsListe.get(i).getPoeng() > 75000 && medlemsListe.get(i) instanceof Basicmedlem) {
                Gullmedlem nyGull = new Gullmedlem(medlemsListe.get(i).getMedlNr(), medlemsListe.get(i).getPersonalia(), medlemsListe.get(i).getInnmeldt(), medlemsListe.get(i).getPoeng());
                medlemsListe.set(i, nyGull);
            }
            if (medlemsListe.get(i).getPoeng() > 75000 && medlemsListe.get(i) instanceof Soelvmedlem) {
                Gullmedlem nyGullFraSoelv = new Gullmedlem(medlemsListe.get(i).getMedlNr(), medlemsListe.get(i).getPersonalia(), medlemsListe.get(i).getInnmeldt(), medlemsListe.get(i).getPoeng());
                medlemsListe.set(i, nyGullFraSoelv);
            }
        }
    }

    public void skrivutCLass(int medlemsnummer) {
        for (int i = 0; i < medlemsListe.size(); i++) {
            if (medlemsListe.get(i).getMedlNr() == medlemsnummer) System.out.println(medlemsListe.get(i).getClass());
        }
    }

    public static void main(String[] args){
        Medlemsarkiv m = new Medlemsarkiv();
        LocalDate testdato = LocalDate.of(2008, 2, 10);
        Personalia tove = new Personalia("Hansen", "Tove", "tove.hansen@dot.com", "tove");
        Personalia simon = new Personalia("Årdal", "Simon", "simon.aardal@dot.com", "simon");
        Personalia max = new Personalia("Schau", "Max", "max.schau@dot.com", "max");
        Personalia jonas = new Personalia("Liahagen", "Jonas", "Jonas.Liahagen@dot.com", "jonas");
        int Tovesmedlnr = m.nyMedlem(tove, testdato);
        if(m.registrerPoeng(Tovesmedlnr,45000)) System.out.println("Toves poengsum: 45000"); //Bør gå fra basic til soelv
        int Simonsmedlnr = m.nyMedlem(simon, testdato);
        if(m.registrerPoeng(Simonsmedlnr,90000)) System.out.println("Simons poengsum: 90000"); //Bør gå fra basic til Gull
        int Jonasmedlnr = m.nyMedlem(jonas, testdato);
        if(m.registrerPoeng(Jonasmedlnr,50000)) System.out.println("Jonas poengsum: 50000"); //Bør gå fra basic til Sølv
        m.sjekkMedlemmer();
        m.skrivutCLass(Tovesmedlnr);
        m.skrivutCLass(Simonsmedlnr);
        if(m.registrerPoeng(Jonasmedlnr,50000)) System.out.println("Jonas poengsum: 100000");
        m.sjekkMedlemmer();
        m.skrivutCLass(Jonasmedlnr);
    }
}

/*Tidligere tester:
//System.out.println(m.finnPoeng(Tovesmedlnr, "tove"));
 */

/*
public int finnPoeng(int medlemsnummer, String passord){
        for(int i = 0; i<medlemsListe.size();i++){
            if(medlemsListe.get(i).getMedlNr() == medlemsnummer && medlemsListe.get(i).okPassord(passord)){
                return medlemsListe.get(i).getPoeng();
            }
        }
        return 0;
    }

    public boolean registrerPoeng(int medlemsnummer, int poeng){
        if(medlemsnummer > medlemsListe.size()) return false;
        if(medlemsListe.get(medlemsnummer-1).registrerPoeng(poeng)) return true;
        return false;
    }
 */
