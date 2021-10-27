class Valuta{ //klasse
	private final double kurs; //objektvariabel
	
	public Valuta(double kurs){  //konstruktør
		this.kurs = kurs;
	}
	public double getKurs(){ //objektmetode
		return kurs;
	}
	public double getTilNok(double tall){
		return tall * kurs;
	}
	public double getFraNok(double tall){
		return tall/kurs;
	}
}

