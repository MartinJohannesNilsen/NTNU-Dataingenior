import static javax.swing.JOptionPane.*;
class Oppgave3{
	public static void main(String[] args){
		char bokstav = 'a';
		while(true){
				String inputTekst = showInputDialog("Skriv inn en tekst:");
				Tekstanalyse tekst = new Tekstanalyse(inputTekst);

				System.out.println("Teksten inneholder " + tekst.antallForskjelligeBokstaver() + " forskjellige bokstaver");
				System.out.println("Teksten inneholder " + tekst.antallBokstaver() + " bokstaver");
				System.out.println("Teksten inneholder " + tekst.prosentTegn() + " tegn");
				System.out.println("Det er " + tekst.antallAvBokstaver(bokstav) + " stk. av bokstaven \"" + bokstav + "\" i \"" + inputTekst.toLowerCase() + "\"");
				System.out.println(tekst.bokstavForekommerOftest() + " forekommer oftest");
				
				
				//Husk at programmet teller space som et tegn, så om du har mange space får du fort "Et udefinert tegn forekommer oftest"	
		}
	}
}