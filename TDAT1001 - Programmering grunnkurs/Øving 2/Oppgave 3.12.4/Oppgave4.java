import static javax.swing.JOptionPane.*;

class Oppgave4 {
	public static void main(String[] args) {
	
	double a = 35.90;
	double agram = 450;
	double b = 35.90;
	double bgram = 500;
		
	double aforhold = a / agram;
	double bforhold = b / bgram;
	
	if(aforhold == bforhold){
		showMessageDialog(null, "Prisene er like");
	}
	
	if(aforhold < bforhold){
		showMessageDialog(null, "Kjøttdeig av merke A er billigst per gram");	
	}
	
	if(aforhold > bforhold){
		showMessageDialog(null, "Kjøttdeig av merke B er billigst per gram");
	}
	
	
		
	}
}