class Oppgaveoversikt{
	private Student[] studenter;
	private int antStud = 0;
	
	public Oppgaveoversikt(){
		this.studenter = new Student[antStud];
	}
	
	public void regNyStud(String navn, int antOppg){
		utvidTabell();
		studenter[antStud] = new Student(navn, antOppg); 
		antStud++;
	}
	
	private void utvidTabell() {
		Student[] nyTab = new Student[studenter.length + 1];
		for(int i = 0; i < studenter.length; i++){
			nyTab[i] = studenter[i];
		}
		studenter = nyTab;	
	}

	public int finnAntStud(){
		return antStud;
	}
	
	public void økAntOppg(int studentnr, int økning){
		if(studentnr <= 0){
			throw new IllegalArgumentException("Denne personen finnes ikke");
		}
		if(økning <= 0){
			throw new IllegalArgumentException("Ikke godkjent er ikke bra nok!");
		}
		
		studenter[studentnr - 1].økAntOppg(økning);
	}
	
	public int oppgaverLøst(int studentnr){
		return studenter[studentnr-1].getAntOppg();
	}
	
	public String getNavn(int studnr){
		return studenter[studnr-1].getNavn();
	}
	
	public String toString(){
		String utskrift = "";
		for(int i = 0; i < studenter.length; i++){
			utskrift += studenter[i].getNavn() + " har " + studenter[i].getAntOppg() + " oppgaver godkjent\n";
		}
		return "Studenter: \n" + utskrift + "Antall studenter: " + finnAntStud(); 
	}
}

