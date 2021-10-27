class NyString{
	private final String innlestTekst;
	
	public NyString(String innlestTekst){
		this.innlestTekst = innlestTekst;
	}
	
	public String getTekst(){
		return innlestTekst;
	}
	
	public String utførForkorting(){
		String skalForkortes = innlestTekst;
		String[] ord = skalForkortes.split(" ");
		String forkortetOrd = "";
		
		for(int i = 0; i<ord.length; i++){
			forkortetOrd += ord[i].charAt(0);
		}
		return forkortetOrd;
	} 
	
	public String utførFjerningAvTegn(String bokstav){
		String tekstMedFjernetTegn = innlestTekst;
		tekstMedFjernetTegn = tekstMedFjernetTegn.replace(bokstav, "");
		
		return tekstMedFjernetTegn;
	}
	
	
	
}
