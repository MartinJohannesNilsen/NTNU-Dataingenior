class TestKlient{
	public static void main(String[] args){
		int[][] temp = {{1,1,1,1},{2,2,2,2},{3,3,3,3},{4,4,4,4},{5,5,5,5}};
		Temperaturer tabell = new Temperaturer(temp);
	
		System.out.println(tabell.finnMiddeltempDag(2));
		System.out.println(tabell.finnMiddeltempHverTime(2));
		System.out.println(tabell.finnMiddeltempHeleMåneden());
		for(int i = 0; i < tabell.finnAntDøgnMedMiddeltemp().length; i++){
			System.out.println("Periode " + (i+1) + ": " + tabell.finnAntDøgnMedMiddeltemp()[i]);
		}
	
	}
}