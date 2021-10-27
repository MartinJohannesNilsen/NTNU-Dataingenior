import static javax.swing.JOptionPane.*;
class Oppgave1{
	public static void main(String[] args){
		java.util.Random random = new java.util.Random();
	
		int[] antall = new int[10]; 
		//lager tabell med 10 ulike elementer og lagrer denne i int-tabellen "antall"

		for(int i=0; i<10000; i++){ //løkke kjøres 1000 ganger
			int tall = random.nextInt(10);
			antall[tall] += 1;
		} 
		for(int i = 0; i < 10; i++){ //println kjøres 10 ganger
			System.out.println("Antall forekomster av " + (i+1) + " : " + antall[i]);
		}	
	}
}

