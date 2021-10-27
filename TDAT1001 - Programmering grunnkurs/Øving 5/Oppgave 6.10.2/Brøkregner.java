import static javax.swing.JOptionPane.*;
class Brøkregner{
	private int teller;
	private int nevner;
	
	public Brøkregner(int teller, int nevner){
		if(nevner==0){
			throw new IllegalArgumentException("Nevner kan ikke være 0");
		}
		
		this.teller = teller;
		this.nevner = nevner;
	}
		
	public Brøkregner(int teller){
		this.teller = teller;
		nevner = 1;
	} 
	
	public int getTeller(){
		return teller;
	}
	
	public int getNevner(){
		return nevner;
	}
	
	public void utførPluss(Brøkregner brøk){
		if(this.nevner!=brøk.getNevner()){
			int brøkTeller = brøk.getTeller();
			this.teller *= brøk.getNevner();
			brøkTeller *= this.nevner;
			this.nevner *= brøk.getNevner();
			this.teller += brøkTeller;
		}else{
			this.teller += brøk.getTeller();
		}
	}
	
	public void utførMinus(Brøkregner brøk){
		if(this.nevner!=brøk.getNevner()){
			int brøkTeller = brøk.getTeller();
			this.teller *= brøk.getNevner();
			brøkTeller *= this.nevner;
			this.nevner *= brøk.getNevner();
			this.teller -= brøkTeller;
		}else{
			this.teller -= brøk.getTeller();
		}
	}
	
	public void utførGange(Brøkregner brøk){
		this.teller *= brøk.getTeller();
		this.nevner *= brøk.getNevner();
	}
	
	public void utførDele(Brøkregner brøk){
		this.teller *= brøk.getNevner();
		this.nevner *= brøk.getTeller();
	}

	//Testprogram:
	public static void main(String[] args){
		Brøkregner brøkKonstruktør = new Brøkregner(1,2);
		Brøkregner brøkKonstruktørUNevner = new Brøkregner(1);
		Brøkregner brøk1 = new Brøkregner(1,2);
		Brøkregner brøk2 = new Brøkregner(2,3);
		Brøkregner brøk3 = new Brøkregner(2,3);
		Brøkregner brøk4 = new Brøkregner(1,2);
		Brøkregner brøk5 = new Brøkregner(1,2);
		Brøkregner brøk6 = new Brøkregner(2,3);
		Brøkregner brøk7 = new Brøkregner(1,2);
		Brøkregner brøk8 = new Brøkregner(2,3);
		
		
		if(brøkKonstruktør.getTeller()==1 && brøkKonstruktør.getNevner()==2){
			System.out.println("Brøkregner: Test 1 Vellykket");
		}else{
			System.out.println("Brøkregner: Test 1 Ikke Vellykket");
		}
		
		if(brøkKonstruktørUNevner.getTeller()==1 && brøkKonstruktørUNevner.getNevner()==1){
			System.out.println("Brøkregner: Test 2 Vellykket");
		}else{
			System.out.println("Brøkregner: Test 2 Ikke Vellykket");
		}
		
		brøk1.utførPluss(brøk2);
		if(brøk1.getTeller()==7 && brøk1.getNevner()==6){
			System.out.println("Brøkregner: Test 3 Vellykket");
		}else{
			System.out.println("Brøkregner: Test 3 Ikke Vellykket");
		}
		
		brøk3.utførMinus(brøk4);
		if(brøk3.getTeller()==1 && brøk3.getNevner()==6){
			System.out.println("Brøkregner: Test 4 Vellykket");
		}else{
			System.out.println("Brøkregner: Test 4 Ikke Vellykket");
		}
		
		brøk5.utførGange(brøk6);
		if(brøk5.getTeller()==2 && brøk5.getNevner()==6){
			System.out.println("Brøkregner: Test 5 Vellykket");
		}else{
			System.out.println("Brøkregner: Test 5 Ikke Vellykket");
		}
		
		brøk7.utførDele(brøk8);
		if(brøk7.getTeller()==3 && brøk7.getNevner()==4){
			System.out.println("Brøkregner: Test 6 Vellykket");
		}else{
			System.out.println("Brøkregner: Test 6 Ikke Vellykket");
		}		
	}
	
/*
	public static void main(String[] args){
	
		String teller = showInputDialog("Teller: ");
		int tellerLest = Integer.parseInt(teller);
		String nevner = showInputDialog("Nevner: ");
		int nevnerLest = Integer.parseInt(nevner);
		Brøkregner brøk = new Brøkregner(tellerLest, nevnerLest);
	
		String operand = showInputDialog("Velg operand:\n 1. Addisjon \n 2. Subtraksjon \n 3. Multiplikasjon \n 4. Divisjon ");
		int operandLest = Integer.parseInt(operand);

		String nyTeller = showInputDialog("Ny teller: ");
		int nyTellerLest = Integer.parseInt(nyTeller);
		String nyNevner = showInputDialog("Ny nevner: ");
		int nyNevnerLest = Integer.parseInt(nyNevner);

		switch(operandLest){
			case 1:
				brøk.utførPluss(nyTellerLest, nyNevnerLest);
				break;
			case 2:				
				brøk.utførMinus(nyTellerLest, nyNevnerLest);
				break;
			case 3:
				brøk.utførGange(nyTellerLest, nyNevnerLest);
				break;
			case 4:
				brøk.utførDele(nyTellerLest, nyNevnerLest);
				break;
		}
		
		showMessageDialog(null, "Svar: " + brøk.getTeller() + "/" + brøk.getNevner() );
	
	}
	
	*/
	
}