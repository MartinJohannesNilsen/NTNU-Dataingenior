import static javax.swing.JOptionPane.*;

class Oppgave3 {
	public static void main(String[] args){
		
		String antallsekunder = showInputDialog("Skriv inn antall sekunder: ");
		int sekunder = Integer.parseInt(antallsekunder);
		
		int sektiltime = sekunder/3600;
		int sektilmin = (sekunder-3600*sektiltime)/60;
		int sektilsek = sekunder - sektiltime*3600 - sektilmin*60;
		
		String utskrift = (antallsekunder + " blir " + sektiltime + " timer, " + sektilmin + " minutter og " + sektilsek + " sekunder");
		showMessageDialog(null, utskrift);
	}
}

 