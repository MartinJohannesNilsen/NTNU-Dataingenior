class By implements java.io.Serializable{
        private String navn;
        private String ordfører;
        private int antallInnbyggere;
        private int maksAntallInnbyggere = 1000;

        public By(String navn, String ordfører, int antallInnbyggere, int maksAntallInnbyggere) throws Exception{
            this.navn = navn;
            this.ordfører = ordfører;
			if (antallInnbyggere <= maksAntallInnbyggere){
				this.antallInnbyggere = antallInnbyggere;
		        this.maksAntallInnbyggere = maksAntallInnbyggere;
			} else throw new Exception("Byen kan ikke ha flere innbyggere enn det er plass til!");
        }

        public By (){}

        public String getNavn(){ return navn; }
        public void setNavn(String newValue) { navn = newValue; }

        public String getOrdfører(){ return ordfører; }
        public void setOrdfører(String newValue) { ordfører = newValue; }

        public int getAntallInnbyggere(){return antallInnbyggere;}
        public void setAntallInnbyggere(int newValue){ maksAntallInnbyggere = newValue;}

		public int getMaksAntallInnbyggere(){ return maksAntallInnbyggere;}
		public void setMaksAntallInnbyggere(int newValue){maksAntallInnbyggere = newValue;}

     	public String toString() {
            return navn + " " + ordfører + " " + antallInnbyggere + " " + maksAntallInnbyggere;
        }
        public boolean equals(Object obj) {
            if (this==obj) return true;
            if (obj instanceof By) {
                By by = (By) obj;
                if (by.getNavn().equals(navn)) return true;
            }
            return false;
        }
        public int getLedigKapasitet(){return maksAntallInnbyggere - antallInnbyggere;}
		public boolean ledig(){ return (antallInnbyggere <= maksAntallInnbyggere);}
    }