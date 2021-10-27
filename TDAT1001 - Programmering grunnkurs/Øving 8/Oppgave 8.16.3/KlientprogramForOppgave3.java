class KlientprogramForOppgave3{
	public static void main(String[] args){
		String innlesttekst = "Hei jeg heter Martin. Jeg er 19 år.";
		String bytteOrd = "hei";
		String nyttOrd = "Halla";
		Tekstbehandler tekst = new Tekstbehandler(innlesttekst);
		
		System.out.println("Tekst: " + tekst.getTekst());
		System.out.println("Tekst i store bokstaver: " + tekst.getTekstMedStoreBokstaver());
		System.out.println("Antall ord: " + tekst.getAntallOrdITeksten());
		System.out.println("Gj.snittlig ordlengde: " + tekst.getGjennomsnittligOrdlengde());
		System.out.println("Gj.snittlig antall ord per periode: " + tekst.getGjennomsnittligOrdPerPeriode());
		System.out.println("Tekst der \"" + bytteOrd + "\" er skiftet ut med \"" + nyttOrd + "\": " + tekst.byttUtOrd(bytteOrd, nyttOrd));
	}
}