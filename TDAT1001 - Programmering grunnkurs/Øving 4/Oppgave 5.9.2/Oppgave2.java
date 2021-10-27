import static javax.swing.JOptionPane.*;

class Oppgave2{
	public static void main(String[] args){
		
		Valuta usdValuta = new Valuta(0.1191);
		Valuta eurValuta = new Valuta(0.1030);
		Valuta sekValuta = new Valuta(1.0785);
	
		double kurs = 0;
	 	String tallLest = " ";
		double tall = 0;
		double nokTilUsd = 0;
		double nokTilEuro = 0;
		double nokTilSek = 0;

		Boolean avsluttet = false;
		while(!avsluttet){
		  tallLest = showInputDialog("Velg Valuta: \n 1: dollar \n 2: euro \n 3: svenske kroner \n 4: avslutt");
		  int innlestTall = Integer.parseInt(tallLest);
		
			switch (innlestTall){
 				case 4:
			 		avsluttet = true;
 					break;
				case 1:
		 			tallLest = showInputDialog("Skriv inn antall nok du vil ha til USD");
					tall = Double.parseDouble(tallLest);
					nokTilUsd = usdValuta.getTilNok(tall);	
					if(tall>=0){
						showMessageDialog(null, tall + " Nok er lik " + nokTilUsd + " dollar" );
					}else{
						showMessageDialog(null, "Du har satt inn noe feil");
					 }
					break; 
				case 2:
	 				tallLest = showInputDialog("Skriv inn antall nok du vil ha til euro");
					tall = Double.parseDouble(tallLest);
					nokTilEuro = eurValuta.getTilNok(tall);	
					if(tall>=0){
						showMessageDialog(null, tall + " Nok er lik " + nokTilEuro + " euro" );
					}else{
						showMessageDialog(null, "Du har satt inn noe feil");
					 }
					 break;
				case 3:
		 			tallLest = showInputDialog("Skriv inn antall nok du vil ha til sek");
					tall = Double.parseDouble(tallLest);
					nokTilSek = sekValuta.getTilNok(tall);				
					if(tall>=0){
						showMessageDialog(null, tall + " Nok er lik " + nokTilSek + " sek" );
					}else{
						showMessageDialog(null, "Du har satt inn noe feil");
					 }
					 break;
				default:
					showMessageDialog(null, "Du har skrevet inn noe feil (bruk 1,2,3 eller 4)");
					break;
				
				
			
		}
	}
	}
}