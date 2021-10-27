class Student{
	private String navn; 
	private int antOppg; //holder orden på hvor mange av de oppgavene studenten har levert inn, som er godkjent
	
	public Student(String navn, int antOppg){
		this.navn = navn;
		this.antOppg = antOppg;
	}
	
	public String getNavn(){
		return navn;
	}
	
	public int getAntOppg(){
		return antOppg;
	}
	
	public void økAntOppg(int økning){
		antOppg += økning;
	}
	
	public String toString(){
		return "Navn: " + navn + "\nAntall Oppgaver godkjent: " + antOppg;
	}
	
	
	
	
	public static void main(String[] args){
		Student student = new Student("Martin",9);
		System.out.println("Antall tester: 3 \n" );
		
		//Test 1
		if(student.getNavn() == "Martin")System.out.println("Test 1 vellykket");
		
		
		//Test 2
		if(student.getAntOppg() == 9) System.out.println("Test 2 vellykket");
		
		
		//Test 3
		student.økAntOppg(1);
		if(student.getAntOppg() == 10) System.out.println("Test 3 vellykket");
		
	}
	


}



	
