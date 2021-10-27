import static javax.swing.JOptionPane.*;
class KlientprogramForOppgave1{
	public static void main(String[] args) throws InterruptedException{
		while(true){
			String innlestTekst = showInputDialog(null, "Skriv inn tekst her:");
			NyString tekst = new NyString(innlestTekst);
		
			boolean ikkeFeilInput = false;
			while(!ikkeFeilInput){
				String valgBoks = showInputDialog(null, "Vil du: \n 1. Skrive ut innlest tekst? \n 2. Forkorte innlest tekst? \n 3. Fjerne et tegn?");
				char valg = valgBoks.charAt(0);
				switch(valg){
				case('1'): 
					System.out.println(tekst.getTekst());
					ikkeFeilInput = true;
					break;
				case('2'):
					System.out.println(tekst.utførForkorting());
					ikkeFeilInput = true;
					break;
				case('3'):
					String innlestBokstav = showInputDialog(null, "Hvilket tegn vil du fjerne?");
					System.out.println(tekst.utførFjerningAvTegn(innlestBokstav));
					ikkeFeilInput = true;
					break;
				default:
				showMessageDialog(null, "Du har skrevet inn noe feil, prøv igjen!");
					break;
				}
			}
			Thread.sleep(2000);
		}
	}
}