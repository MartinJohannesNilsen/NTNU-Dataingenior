import static javax.swing.JOptionPane.*;

class Oppgave3{
	public static void main(String[] args){
		int antallRunder = 0;
		simSpiller player1 = new simSpiller(0);
		simSpiller player2 = new simSpiller(0);
		
		int player1Kast = 0;
		int player2Kast = 0;
		int player1Sum = 0;
		int player2Sum = 0;		
		
		while(player1Sum < 100 && player2Sum < 100){
			
			antallRunder++;
			player1Kast = player1.terningKast();
			player2Kast = player2.terningKast();
			
			player1Sum = player1.getSum();
			player2Sum = player2.getSum();
			
			System.out.println("Runde " + antallRunder + ": Player 1 kastet " 
					+ player1Kast + " og Player 2 kastet " + player2Kast 
					+ ". Stillingen er " + player1Sum + " | " + player2Sum);                   
		}	
			
		if(player1Sum>=100){
			System.out.println("Player 1 vant ettersom han/hun kom til 100 først!");
		}else {
			System.out.println("Player 2 vant ettersom han/hun kom til 100 først!");
		 }		
	}
}
