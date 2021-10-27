/** Her skal jeg lage et program som skal finne ut om et år er et skuddår.
* Årstallet skal kunne skrives inn av brukeren
*/

import static javax.swing.JOptionPane.*;
class Oppgave3versjon2 {
	public static void main(String[] args){
	String tallLest = showInputDialog("Skriv inn år: ");

	int tall = Integer.parseInt(tallLest);
	int årHundreskuddår = tall %400;

	if(tall<=0){
		showMessageDialog(null, "Du satte inn noe feil!");
	}

	else{

		if(tall %100 == 0){   //hvis århundre

			if(tall %400 == 0){  //hvis tallet er delelig med 400
			showMessageDialog(null, "Årstallet " + tall + " er et skuddår");
		    } else {
			showMessageDialog(null, "Årstallet " + tall + " er ikke et skuddår");
			}

		} else{  //hvis ikke århundre

			if(tall %4 == 0){  //hvis tallet er delelig med 4
			showMessageDialog(null, "Årstallet " + tall + " er et skuddår");
		    } else {
			showMessageDialog(null, "Årstallet " + tall + " er ikke et skuddår");
			}
	  }
    }
  }
}
