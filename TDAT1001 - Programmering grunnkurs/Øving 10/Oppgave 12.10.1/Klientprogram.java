class Klientprogram{
	public static void main(String[] args){
		Oppgaveoversikt studenter = new Oppgaveoversikt();
		
		//registrerer studenter
		studenter.regNyStud("Martin", 9);
		studenter.regNyStud("Jonas", 9);
		studenter.regNyStud("Max", 11);
		
		System.out.println(studenter.toString());
		
		studenter.økAntOppg(1, 1); //(studnr, økning)
		System.out.println("\n" + studenter.getNavn(1) + " har nå fått godkjent " + studenter.oppgaverLøst(1) + " oppgaver"); 
		
		
		
		
		
		
	} 
}