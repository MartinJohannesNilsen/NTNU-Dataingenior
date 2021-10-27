class Tekstanalyse{
	String teksten; 
	int[] antallTegn = new int[30]; //Ny tabell med 30 elementer, obs husk at alle elementene vil ha indeks (element-1) fra nå av. 

	public Tekstanalyse(String teksten){
		this.teksten = teksten.toLowerCase();
		for(int i = 0; i<teksten.length(); i++){ 
			char tegn = teksten.charAt(i); //hvert tegn som char, viktig med (i)
			int tegnVerdi = tegn; //Unicode er en heltallsverdi, så gjør den om til verdi

			switch(tegnVerdi){
				case(230): //æ
					antallTegn[26]++;
					break;
				case(248): //ø
					antallTegn[27]++;
					break;
				case(229): //å
					antallTegn[28]++;
					break;
				default:
					if(tegnVerdi > 96 && tegnVerdi < 123){ //97 er a, 122 er z
						antallTegn[tegnVerdi - 97]++; //eks a = 97. men vil lagre denne i antallTegn[0], derfor -97
					}else {
						antallTegn[29]++; //lagrer resten av tegn i element 30
					 }
			}
		}
	} //etter konstruktøren har vi nå en tabell antallTegn[] med 30 elementer, alle fylt opp etter antall forskjellige bokstaver tilstede i teksten

	public int antallForskjelligeBokstaver(){
		int antallForskjelligeBokstaver = 0; 
		for(int i = 0; i < 29; i++){ //kjøres 29 ganger, vil ikke ha med tegn her
			if(antallTegn[i] != 0){
				antallForskjelligeBokstaver++; //For alle elementene som ikke er null, øk teller antallForskjelligeBokstaver med 1.
			}
		}
		return antallForskjelligeBokstaver;
	}

	public int antallBokstaver(){
		int antallBokstaver = 0;
		for(int i = 0; i < 29; i++){
				antallBokstaver += antallTegn[i]; //plusser på alle elementene (utenom tegn) og lagrer i antallBokstaver
		}
		return antallBokstaver;
	}

	public String prosentTegn(){
		double totaltAntallTegn = 0.0;
		for(int i = 0; i < 30; i++){
			if(antallTegn[i] != 0){
				totaltAntallTegn += antallTegn[i];
			}
		}
		double prosentAnt = (antallTegn[29]/totaltAntallTegn)*100;
		return prosentAnt + "%";
	}
	
	
	public int antallAvBokstaver(char bokstav){
		int bokstavUnicode;
		int antallAvBokstaven;
		
		switch(bokstav){
			case('æ'): //æ = 230
				bokstavUnicode = bokstav;
				antallAvBokstaven = antallTegn[(bokstavUnicode-204)]; //230-26 = 204
				break;
			case('ø'): //ø = 248
				bokstavUnicode = bokstav;
				antallAvBokstaven = antallTegn[(bokstavUnicode-221)]; //248-27 = 221 
				break;
			case('å'): //å = 229
				bokstavUnicode = bokstav;
				antallAvBokstaven = antallTegn[(bokstavUnicode-201)]; //229-28 = 201 
				break;
			default:
				bokstavUnicode = bokstav;
				antallAvBokstaven = antallTegn[(bokstavUnicode-97)];
				break;
		}
		return antallAvBokstaven; 
	}
	
	
			
	public String bokstavForekommerOftest(){
		int tallFlestGanger = 0;
		String forekommerOftest = "";
		
		for(int i = 0; i < 30; i++){
			if(antallTegn[i] > tallFlestGanger){
				forekommerOftest = "";
				tallFlestGanger = antallTegn[i];
				switch(i){
					case(26):
						forekommerOftest = "æ";
						break;
					case(27):
						forekommerOftest = "ø";
						break;
					case(28):
						forekommerOftest = "å";
						break;
					case(29):
						forekommerOftest += "Et udefinert tegn";
						break;
					default:
						forekommerOftest += (char)(i + 97); //char som tilsier tallet eks a gir i=0, a vises istedenfor 97
				}
				
			}else if(antallTegn[i] == tallFlestGanger){
				switch(i){
					case(26):
						forekommerOftest += " & æ";
						break;
					case(27):
						forekommerOftest += " & ø";
						break;
					case(28):
						forekommerOftest += " & å";
						break;
					case(29):
						forekommerOftest += " & et udefinert tegn";
						break;	
					default:
						forekommerOftest += " & " + (char)(i + 97);
						break;				
				}		
			 }
			
		}
		return forekommerOftest;
	}	
}