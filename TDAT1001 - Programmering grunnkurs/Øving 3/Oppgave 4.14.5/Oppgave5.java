import static javax.swing.JOptionPane.*;
class Oppgave5 {
	public static void main(String[] args){
			
		String tallLest = showInputDialog("Skriv inn et tall: ");
		int tall;
		while(tallLest != null){
			tall = Integer.parseInt(tallLest);
		
			if(tall <= 0){
				showMessageDialog(null, "Du satte inn noe ugyldig!");
			} else if(tall == 2){
				showMessageDialog(null, tall + " er et primtall");
			} else if(tall == 1){
								showMessageDialog(null, tall + " er ikke et primtall");
			} else {
				
				boolean erPrimtall = true;
				int deleTall = 2;
				while(deleTall < tall){
					
					if(tall % deleTall != 0){
						deleTall++;
					} else {
						erPrimtall = false;
						break;
					}
				}
				
				if(erPrimtall == true){
					showMessageDialog(null, tall + " er et primtall!");
				} else {
					showMessageDialog(null, tall + " er ikke et primtall!");
				}
	
				
			}  tallLest = showInputDialog("Skriv inn et tall: ");
		}
	}
}
