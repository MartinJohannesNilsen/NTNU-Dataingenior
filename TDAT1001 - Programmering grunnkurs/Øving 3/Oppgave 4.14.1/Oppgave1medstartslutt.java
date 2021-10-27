/**
* Her skal jeg lage en innlesing av tall og kjøre gangetabellen av det tallet
*
**/



import static javax.swing.JOptionPane.*;
class Oppgave1medstartslutt {
	public static void main(String[] args){
		
		String tallLest1 = showInputDialog("Skriv inn laveste tall du vil ha gangetabellen for ");
		String tallLest2 = showInputDialog("Skriv inn høyeste tall du vil ha gangetabellen for ");
		
		if (tallLest1 == null || tallLest2 == null){
			showMessageDialog(null, "Du må sette inn et tall");
		} else{
		
			int innlestTall1 = Integer.parseInt(tallLest1);
			int innlestTall2 = Integer.parseInt(tallLest2);
			
			
			if(innlestTall1 == 0 && innlestTall2 == 0){
				showMessageDialog(null, "Du har satt inn noe feil!");
			} else if(innlestTall1 > innlestTall2){
				showMessageDialog(null, "Du kan ikke ha høyere startverdi enn sluttverdi!");
			} else{
				
				while(innlestTall1 <= innlestTall2){
			
					System.out.println(innlestTall1 + "-gangen: ");
		
					int faktor = 1;
					while (faktor < 11) {
							
						System.out.println(innlestTall1 + " x " + faktor + " = " + innlestTall1 * faktor);
						faktor++;
					} //Slutt While	
				
					innlestTall1++;
					System.out.println("\n");
				}
			}//Slutt else sjekk ikke høyere start enn slutt
		}//slutt else sjekk ikke null
	} //Slutt main
} //Slutt class


