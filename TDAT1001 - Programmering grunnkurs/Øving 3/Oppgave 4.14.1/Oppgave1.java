/**
* Her skal jeg lage en innlesing av tall og kjøre gangetabellen av det tallet
*
**/



import static javax.swing.JOptionPane.*;
class Oppgave1 {
	public static void main(String[] args){

		while(true){

			String tallLest = showInputDialog("Skriv inn ønsket gangetabell ");
			int innlestTall = Integer.parseInt(tallLest);

			if(innlestTall>0){

				System.out.println(" ");
				System.out.println(innlestTall + "-gangen: ");

				int faktor = 1;
				while (faktor < 11) {
					System.out.println(innlestTall + " x " + faktor + " = " + innlestTall * faktor);
					faktor++;
				} //Slutt While

			} else{
				showMessageDialog(null, "Du har satt inn noe feil");
			}
		}
	} //Slutt main
} //Slutt class
