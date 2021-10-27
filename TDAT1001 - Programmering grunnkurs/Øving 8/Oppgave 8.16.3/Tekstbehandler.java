import java.util.StringTokenizer;
class Tekstbehandler{
	private String tekst;
	
	public Tekstbehandler(String tekst){
		this.tekst = tekst;
	}
	
	public String getTekst(){
		return tekst;
	}

	public String getTekstMedStoreBokstaver(){
		return tekst.toUpperCase();
	}
	
	public int getAntallOrdITeksten(){
		String[] ord = tekst.split(" ");
		return ord.length;
	}
	
	public double getGjennomsnittligOrdlengde(){
		StringTokenizer analyse = new StringTokenizer(tekst, " ");
		double ordLengde = 0;
		double antOrd = 0;
		while(analyse.hasMoreTokens()){
			String ord = analyse.nextToken();
			ordLengde += ord.length();
			antOrd++;
		}
		return ordLengde / antOrd;
	}
	
	public double getGjennomsnittligOrdPerPeriode(){
		StringTokenizer antallPerioder = new StringTokenizer(tekst, ".!:?");
		StringTokenizer antallOrd = new StringTokenizer(tekst, " ");
		return (double)antallOrd.countTokens()/(double)antallPerioder.countTokens();
		
		
		//String[] antallPerioder = tekst.split("[.]");
		//String[] antallOrd = tekst.split(" ");
		//return antallOrd.length  / antallPerioder.length;
		//Problemet med metoden ligger i hvordan skrive skilletegn i første linje. Noe med "regular expression" og "Special characters"
	}
	
	public String byttUtOrd(String bytteOrd, String nyttOrd){
		return tekst.replaceAll(bytteOrd, nyttOrd);
		
	}
}


/*

	public double getGjennomsnittligOrdlengde(){
		StringTokenizer st = new StringTokenizer(tekst, ".! ");
		double ordLengde = 0;
		double antOrd = st.countTokens();
		while(st.hasMoreTokens()){
			String setning = st.nextToken();
			ordLengde += setning.length();
		}
		return ordLengde / antOrd;
	}
	
	public double getGjennomsnittligOrdPerPeriode(){
		StringTokenizer setning = new StringTokenizer(tekst, ".!:?");
				StringTokenizer setning2 = new StringTokenizer(tekst, " ");
				return (double)setning2.countTokens()/(double)setning.countTokens();
	}

	public String getGjennomsnittligOrdlengde(){
		String[] antallOrd = tekst.split(".!:? ");
		double ordLengde = 0;
		double antOrd = antallOrd.length;
		for(int i = 0, i<antallOrd.length){
			
		}
		return ordLengde / antOrd;
	}





*/