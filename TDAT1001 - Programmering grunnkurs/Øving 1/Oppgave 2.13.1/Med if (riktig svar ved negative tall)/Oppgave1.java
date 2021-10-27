/**
* Her skal jeg lage et program for å omforme tommer til centimeter
* Jeg skal ha input som i arealberegning 2, og popupvindu for å kunne skrive inn tommer
*/

import static javax.swing.JOptionPane.*;
class Oppgave1 {
	public static void main(String[] args) {
		String tommerLest = showInputDialog("Tommer: ");
		double tommer = Double.parseDouble(tommerLest);
		double centimeter = tommer * 2.54;
		
		if (tommer>=0.0){
		String utskrift = tommer + " tommer er lik " + centimeter + " centimeter";
		showMessageDialog(null, utskrift);
	}
	
	else{ 
		showMessageDialog(null, "Du har satt inn en ugyldig verdi");
		
	}
	
		
	}
}

