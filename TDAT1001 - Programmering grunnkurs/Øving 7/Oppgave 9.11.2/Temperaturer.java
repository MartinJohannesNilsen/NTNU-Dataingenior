class Temperaturer{
	public int[][] temperaturer; //int[dag][time]
	
	public Temperaturer(int[][] tabell){
		this.temperaturer = new int[tabell.length][tabell[0].length];
		for(int i = 0; i < temperaturer.length; i++){
			for(int k = 0; k < temperaturer[i].length; k++){
				this.temperaturer[i][k] = tabell[i][k];
			}
		}
	}

	public double finnMiddeltempDag(int dag){//Gjennomsnittstemperatur ila. dagen, med alle temperaturene per time delt på antall timer.
		double graderILADag = 0.0;
		for(int i = 0; i < temperaturer[dag].length; i++){
			graderILADag += temperaturer[dag][i];
		}
		return graderILADag/temperaturer[dag].length;
	}
	
	public double finnMiddeltempHverTime(int time){
		int timeIndeks = time-1; 
		double sum = 0.0;
		for(int i = 0; i < temperaturer.length; i++){
			sum += temperaturer[i][timeIndeks];
		}
		return sum/temperaturer.length;
		
	}
	
	public double finnMiddeltempHeleMåneden(){
		double sum = 0.0;
		for(int i = 0; i < temperaturer.length; i++){
			for(int k = 0; k < temperaturer[i].length; k++){
				sum += temperaturer[i][k];
			}
		}
		return sum/(temperaturer.length*temperaturer[0].length);
	}
	//Lager en hjelpemetode for neste metode
	private double[] middeltempAlleDager(){
		double snittTabell[] = new double[temperaturer.length];
		for (int i = 0; i < temperaturer.length; i++){
			snittTabell[i] = finnMiddeltempDag(i);
		}
		return snittTabell;
	}

	
	public int[] finnAntDøgnMedMiddeltemp(){
		int[] antDøgnTabell = new int[5];
		for(int i = 0; i < middeltempAlleDager().length; i++){
			if(middeltempAlleDager()[i] < -5){
				antDøgnTabell[0]++;
			}
			if(middeltempAlleDager()[i] >= -5 && middeltempAlleDager()[i] < 0){
				antDøgnTabell[1]++;
			}
			if(middeltempAlleDager()[i] >= 0 && middeltempAlleDager()[i] < 5){
				antDøgnTabell[2]++;
			}
			if(middeltempAlleDager()[i] >= 5 && middeltempAlleDager()[i] < 10){
				antDøgnTabell[3]++;
			}
			if(middeltempAlleDager()[i] > 10){
				antDøgnTabell[4]++;
			}
		}
		return antDøgnTabell;
	}
}	