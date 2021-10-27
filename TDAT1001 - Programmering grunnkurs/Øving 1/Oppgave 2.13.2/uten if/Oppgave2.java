import static javax.swing.JOptionPane.*;

class Oppgave2 {
	public static void main(String[] args) {
		String timerLest = showInputDialog("Timer: ");
		int timer = Integer.parseInt(timerLest);
		
		String minutterLest = showInputDialog("Minutter: ");
		int minutter = Integer.parseInt(minutterLest);
	
		String sekunderLest = showInputDialog("Sekunder: ");
		int sekunder = Integer.parseInt(sekunderLest);
		
		int sekunderTotalt = (timer*3600)+(minutter*60)+sekunder;
		String utskrift = (timer + " timer, " + minutter + " minutter og " + sekunder + " sekunder er lik " + sekunderTotalt + " sekunder");
		showMessageDialog(null, utskrift);
	
	}
}


