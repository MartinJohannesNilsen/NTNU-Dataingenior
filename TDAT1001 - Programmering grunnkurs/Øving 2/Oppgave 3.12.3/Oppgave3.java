/** Her skal jeg lage et program som skal finne ut om et år er et skuddår.
* Årstallet skal kunne skrives inn av brukeren
*/

import static javax.swing.JOptionPane.*;
class Oppgave3 {
	public static void main(String[] args){
	String tallLest = showInputDialog("Skriv inn år: ");

	int tall = Integer.parseInt(tallLest);
	int rest = tall %4;
	int årHundre = tall %100;
	int årHundreskuddår = tall %400;

	if(tall<=0){
		showMessageDialog(null, "Du satte inn noe feil!");
	}

	else{


	if(årHundre !=0){   //hvis ikke århundre

		if(rest !=0){  //hvis tallet ikke er delelig med 4
			showMessageDialog(null, "Årstallet " + tall + " er ikke et skuddår");
		} else {
			showMessageDialog(null, "Årstallet " + tall + " er et skuddår");
		}

	} else{  //hvis århundre

		if(årHundreskuddår != 0){ //hvis tallet ikke er delelig med 400
			showMessageDialog(null, "Årstallet " + tall + " er ikke et skuddår");

		} else {
			showMessageDialog(null, "Årstallet " + tall + " er et skuddår");
		}
	  }
    }
  }
}
