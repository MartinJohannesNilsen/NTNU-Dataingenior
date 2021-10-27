import java.util.regex.*;
class Oppgave6 {

    private boolean inneholderSiffer(String tekst){
        return tekst.matches(".*\\d.*");
    }

    private boolean påDatoFormat(String tekst){
        return tekst.matches("\\d\\d\\/\\d\\d\\/\\d\\d\\d\\d");
    }

    private boolean minst10Tegn(String tekst){
        return tekst.matches("^[a-z0-9]{10}$");
    }

    private boolean inneholderTegnSomIkkeErBokstav(String tekst){
        return Pattern.compile("[^a-z0-9]").matcher(tekst).find();
    }
    public static void main(String[] args){
        Oppgave6 a = new Oppgave6();
        if(a.inneholderSiffer("abc1"))System.out.println("Test 1: Vellykket");
        if(!a.inneholderSiffer("abc"))System.out.println("Test 2: Vellykket");
        if(a.påDatoFormat("28/10/2019"))System.out.println("Test 3: Vellykket");
        if(!a.påDatoFormat("28/10/19"))System.out.println("Test 4: Vellykket");
        if(a.minst10Tegn("abcdefghij"))System.out.println("Test 5: Vellykket");
        if(!a.minst10Tegn("abcde"))System.out.println("Test 6: Vellykket");
        if(a.inneholderTegnSomIkkeErBokstav("abc#"))System.out.println("Test 7: Vellykket");
        if(!a.inneholderTegnSomIkkeErBokstav("abc"))System.out.println("Test 8: Vellykket");
    }
}

