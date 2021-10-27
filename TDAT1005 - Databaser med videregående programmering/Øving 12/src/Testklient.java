package dyrehage;

public class Testklient {
    public static void main(String[] args){
        Rovdyrfabrikk lag = new Rovdyrfabrikk();
        SkandinaviskeRovdyr Thea = lag.nyBinne("Thea", 1999, 1999, "Osloveien", 2);
        SkandinaviskeRovdyr Martin = lag.nyHannbjoern("Martin", 1999, 1999, "Osloveien");
        SkandinaviskeRovdyr Iren = lag.nyUlvetispe("Iren", 2009, 1999, "Osloveien", 1);
        SkandinaviskeRovdyr William = lag.nyUlvehann("William", 2005, 1999, "Osloveien");

        System.out.println(Thea.skrivUtInfo());
        System.out.println(Martin.skrivUtInfo());
        System.out.println(Iren.skrivUtInfo());
        System.out.println(William.skrivUtInfo());

        System.out.println("\n-------\nFør inkrementering: "+Thea.getAntKull());
        Thea.leggTilNyttKull();
        System.out.println("Etter inkrementering: " + Thea.getAntKull());

        System.out.println("\n-------\nFør +8: "+Iren.getAntKull());
        Iren.leggTilKull(8);
        System.out.println("Etter +8: " + Iren.getAntKull());

        System.out.println("\n\n6 tester følger:");

        if(Martin.getNavn().equals("Martin"))  System.out.println("Test 1 ok");
        if(Martin.getFdato() == 1999)  System.out.println("Test 2 ok");
        if(Martin.getAlder() == 20)  System.out.println("Test 3 ok");
        if(Martin.getAdresse().equals("Osloveien"))  System.out.println("Test 4 ok");

        Martin.flytt("Hananbakken");
        if(Martin.getAdresse().equals("Hananbakken"))  System.out.println("Test 5 ok");

        if(Martin.getAntKull() == 0)  System.out.println("Test 6 ok");




    }
}
