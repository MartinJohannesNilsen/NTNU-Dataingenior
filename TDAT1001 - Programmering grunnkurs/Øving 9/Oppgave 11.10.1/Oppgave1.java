import static javax.swing.JOptionPane.*;

class Person{
	final String fornavn;
	final String etternavn;
	final int fødselsår; //String for å få med 0
	
	public Person(String fornavn, String etternavn, int fødselsår){
		this.fornavn = fornavn;
		this.etternavn = etternavn;
		this.fødselsår = fødselsår;
	}
	
	public String getFornavn(){
		return fornavn;
	}
	
	public String getEtternavn(){
		return etternavn;
	}
	
	public int getFødselsår(){
		return fødselsår;
	}
	
	public String toString(){
		return fornavn + " " + etternavn + " " + fødselsår;	
	}
	
}

class ArbTaker{
	private final int arbtakernr;
	private final int ansettelsesår;
	public Person personalia;
	private int månedslønn;
	private double skatteprosent;
	private java.util.GregorianCalendar kalender = new java.util.GregorianCalendar();
	
	public ArbTaker(Person personalia, int arbtakernr, int ansettelsesår, int månedslønn, double skatteprosent){
		this.arbtakernr = arbtakernr;
		this.ansettelsesår = ansettelsesår;
		this.personalia = personalia;
		this.månedslønn = månedslønn;
		this.skatteprosent = skatteprosent;
	} 
	
	//getmetoder
	
	public Person getPersonalia(){
		return personalia;
	}

	public int getMånedslønn(){
		return månedslønn;
	}
	
	public double getSkatteprosent(){
		return skatteprosent;
	}
	
	public int getArbtakernr(){
		return arbtakernr;
	}
	
	public int getAnsettelsesår(){
		return ansettelsesår;
	}
	
	//setmetoder
	
	public void setPersonalia(Person nyPersonalia){
		personalia = nyPersonalia;
	}

	public void setMånedslønn(int nyLønn){
		månedslønn = nyLønn;
	}
	
	public void setSkatteprosent(double nySkatteprosent){
		skatteprosent = nySkatteprosent;
	}
	
	//andre metoder
	
	public double skattPerMnd(){
		double skattPrMnd = månedslønn * (skatteprosent/100);
		return skattPrMnd;
	}

	public int bruttolønnPrÅr(){
		int bruttolønn = månedslønn * 12;
		return bruttolønn;
	}

	public double skattetrekkPrÅr(){
		double skattetrekk = månedslønn * 10.5 * (skatteprosent/100); //ganger med 10.5 pga. skattefri juni og halv skatt desember
		return skattetrekk;
	}

	public String getEtternavnFornavn(){
		return personalia.getEtternavn() + ", " + personalia.getFornavn();
	}

	public int getAlder(){
		return kalender.get(java.util.Calendar.YEAR) - personalia.getFødselsår();
	}

	public boolean ansattLengreEnn(int år){
		if((kalender.get(java.util.Calendar.YEAR) - ansettelsesår) > år){
			return true;
		}else{
			return false;
		 }
	}

	public String getFulltNavn(){
		return personalia.getFornavn() + " " + personalia.getEtternavn();
	}
}

//Menystyrt program

class Oppgave1{
public static void main(String[] args){
	String navnLest = showInputDialog("Skriv inn personens navn på formen \"Fornavn Etternavn\"");
	String fødselsårLest = showInputDialog("Skriv inn fødselsår");
	String ansettelsesnrLest = showInputDialog("Skriv inn ansettelsesnr.");
	String startÅrLest = showInputDialog("I hvilket år begynte personen i denne jobben?");
	String månedslønnLest = showInputDialog("Skiv inn månedslønn").replace(",", ".");
	String skatteprosentLest = showInputDialog("Skriv inn skatteprosent").replace(",", ".");
	Person person = new Person(navnLest.split(" ")[0], navnLest.split(" ")[1], Integer.parseInt(fødselsårLest));
 	ArbTaker arbTaker = new ArbTaker(person, Integer.parseInt(ansettelsesnrLest), Integer.parseInt(startÅrLest), Integer.parseInt(månedslønnLest), Double.parseDouble(skatteprosentLest));

	String[] muligheter = {"Hente verdier", "Endre eksisterende verdier", "Jobbet lengre enn x år", "Avslutt"};
	while(true){
		int valg = showOptionDialog(null, "Hva vil du gjøre?", "Klientprogram", 0, QUESTION_MESSAGE, null, muligheter, muligheter[0]);
		String printUtTekst = "";
		switch(valg){
			case 0:
				printUtTekst = "Arbeidstakernummer: " + arbTaker.getArbtakernr();
				printUtTekst += "\nAnsettelsesår: " + arbTaker.getAnsettelsesår();
				printUtTekst += "\nEtternavn, Fornavn: " + arbTaker.getEtternavnFornavn();
				printUtTekst += "\nAlder: " + arbTaker.getAlder();
				printUtTekst += "\nFornavn: " + arbTaker.personalia.getFornavn();
				printUtTekst += "\nEtternavn: " + arbTaker.personalia.getEtternavn();
				printUtTekst += "\nFødselsår: " + arbTaker.personalia.getFødselsår() + "\n";
				printUtTekst += "\nMånedslønn: " + arbTaker.getMånedslønn() + " NOK";
				printUtTekst += "\nSkatteprosent: " + Double.toString(arbTaker.getSkatteprosent()).replace(".", ",") + "%";
				printUtTekst += "\nSkatt pr. måned: " + arbTaker.skattPerMnd() + " NOK";
				printUtTekst += "\nBruttolønn pr. år: " + arbTaker.bruttolønnPrÅr() + " NOK";
				printUtTekst += "\nSkattetrekk pr. år: " + Double.toString(arbTaker.skattetrekkPrÅr()).replace(".", ",") + " NOK";

				showMessageDialog(null, printUtTekst);
				break;
			case 1:
				String[] muligheter2 = {"Månedslønn", "Skatteprosent", "Navn"};
				int valgSet = showOptionDialog(null, "Hva vil du endre på?", "Endring", 0, PLAIN_MESSAGE, null, muligheter2, muligheter[0]);
				switch(valgSet){
					case 0:
						String nyMndLønn = showInputDialog("Hva vil du endre til?");
						arbTaker.setMånedslønn(Integer.parseInt(nyMndLønn));
						System.out.println("Ny månedslønn: " + arbTaker.getMånedslønn());
						break;
					case 1:
						String nySkatteProsent = showInputDialog("Hva vil du endre til?");
						arbTaker.setSkatteprosent(Double.parseDouble(nySkatteProsent.replace(",",".")));
						System.out.println("Ny skatteprosent: " + arbTaker.getSkatteprosent());
						break;
					case 2:
						String navnPåNyttLest = showInputDialog("Skriv inn personens navn på formen \"Fornavn Etternavn\"");
						person = new Person(navnPåNyttLest.split(" ")[0], navnPåNyttLest.split(" ")[1], Integer.parseInt(fødselsårLest));
						arbTaker.setPersonalia(person);
						System.out.println("Nytt navn: " + arbTaker.personalia.getFornavn() + " " + arbTaker.personalia.getEtternavn());
				}
				break;
			case 2:
				String lesÅr = showInputDialog("Sjekk om personen har vært ansatt lengre enn x antall år (fyll inn år): ");
				if(arbTaker.ansattLengreEnn(Integer.parseInt(lesÅr))){
					showMessageDialog(null, arbTaker.getFulltNavn() + " har vært ansatt lengre enn " + lesÅr + " år.");
				} else {
					showMessageDialog(null, arbTaker.getFulltNavn() + " har ikke vært ansatt lengre enn " + lesÅr + " år.");
				}
				break;
			default:
				System.exit(0);
				
			}
		}
	}
}

//Enkelt Klientprogram
/*
class Oppgave1{
	public static void main(String[] args){
		
		String fornavn = "Navn";
		String etternavn = "Navnesen";
		int fødselsår = 1968;
		Person personalia = new Person(fornavn, etternavn, fødselsår);
		
		int arbtakernr = 123456;
		int ansettelsesår = 2010;
		int månedslønn = 50000;
		double skatteprosent = 25;
		ArbTaker arbTaker = new ArbTaker(personalia, arbtakernr, ansettelsesår, månedslønn, skatteprosent);
		
		System.out.println("Personalia: " + arbTaker.getPersonalia() + "\n"
			+ "Månedslønn: " + arbTaker.getMånedslønn() + "\n" 
			+ "Skatteprosent: " + arbTaker.getSkatteprosent() + "\n" 
			+ "Arbeidstakernr: " + arbTaker.getArbtakernr() + "\n" 
			+ "Ansettelsesår: " + arbTaker.getAnsettelsesår());	
		
	}
}
*/


	