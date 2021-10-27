import java.io.*;
import java.util.*;
import static javax.swing.JOptionPane.*;
class Kontovedlikehold{
	private static final String filnavnSaldo = "saldo.txt";
	private static final String filnavnTransaksjoner = "transaksjoner.txt";
	private static TransaksjonsOperasjoner saldoen;
	private static FileWriter skrive;
	private static PrintWriter skriver;
	private static double startSaldo;
	
	
	public Kontovedlikehold(){ //Leser saldo fra fil og oppretter objekt
		try{	
			FileReader forbindelseTilFil = new FileReader(filnavnSaldo);
			BufferedReader leser = new BufferedReader(forbindelseTilFil);
			String saldoLest = leser.readLine();
			startSaldo = Double.parseDouble(saldoLest);
			this.saldoen = new TransaksjonsOperasjoner(startSaldo);
		 	leser.close();
		}catch(FileNotFoundException e){
			System.out.println("Fil ikke funnet: " + filnavnSaldo);
		}catch(NullPointerException e){
			System.out.println("Saldo.txt er tom, sett saldo");
		}catch (NumberFormatException e) {
			System.out.println("Saldo.txt: Feil ved omforming til tall");
		 }catch (IOException e) {
			System.out.println(filnavnSaldo + " finnes ikke");
		 }
	}
	
	public void skrivInnskudd(double innskudd){
		try{
			skrive = new FileWriter(filnavnTransaksjoner, true);
			skriver = new PrintWriter(new BufferedWriter(skrive));
			skriver.println(saldoen.utførInnskudd(innskudd));
			skriver.close();
		}catch(FileNotFoundException e){
			System.out.println("Fil ikke funnet: " + filnavnTransaksjoner);
		 }catch(IOException e){
			 System.out.println("IO-Feil ved åpning/lukking av fil: " + filnavnTransaksjoner);
		  }
	}
		
	public void skrivUttak(double uttak){
		try{
			skrive = new FileWriter(filnavnTransaksjoner, true);
			skriver = new PrintWriter(new BufferedWriter(skrive));
			skriver.println(saldoen.utførUttak(uttak));
			skriver.close();
		}catch(FileNotFoundException e){
			System.out.println("Fil ikke funnet: " + filnavnTransaksjoner);
	 	 }catch(IOException e){
			 System.out.println("IO-Feil ved åpning/lukking av fil: " + filnavnTransaksjoner);
		  }
	}
	
	public void skrivSaldo(){
		try{
			if(saldoen.getSaldo()>0){
				skrive = new FileWriter(filnavnSaldo, false);
				skriver = new PrintWriter(new BufferedWriter(skrive));
				skriver.println(saldoen.getSaldo());
				skriver.close();
			}
		}catch(FileNotFoundException e){
			System.out.println("Fil ikke funnet: " + filnavnSaldo);
	 	 }catch(IOException e){
			 System.out.println("IO-Feil ved åpning/lukking av fil: " + filnavnSaldo);
		  }
	}
	
	public void resetTransaksjoner(){
		try{
			skrive = new FileWriter(filnavnTransaksjoner, false);
			skriver = new PrintWriter(new BufferedWriter(skrive));
			skriver.println("");
			skriver.close();
		}catch(FileNotFoundException e){
			System.out.println("Fil ikke funnet: " + filnavnTransaksjoner);
	 	 }catch(IOException e){
			 System.out.println("IO-Feil ved åpning/lukking av fil: " + filnavnTransaksjoner);
		  }
	}

	public static void main(String[] args){
		Kontovedlikehold saldo = new Kontovedlikehold();
		while(true){
			String[] muligheter = {"Innskudd", "Uttak", "Avslutt"};
			int valg = showOptionDialog(null, "Saldo: " + saldoen.getSaldo(), "Bank", 0, PLAIN_MESSAGE, null, muligheter, muligheter[2]);
			switch(valg){
				case 0:
					String innskuddstall = showInputDialog(null, "Hva vil du sette inn?");
					Double innskudd = Double.parseDouble(innskuddstall);
					saldo.skrivInnskudd(innskudd);
					break;
				case 1:
					String uttakstall = showInputDialog(null, "Hva vil du ta ut?");
					Double uttak = Double.parseDouble(uttakstall);
					saldo.skrivUttak(uttak);
					break;
				case 2:
					if(saldoen.getSaldo()<0){
						saldo.resetTransaksjoner();
						showMessageDialog(null, "Du kan ikke overdra kontoen");
						throw new IllegalArgumentException("Negativ saldo");
					}else {
						saldo.skrivSaldo();
					 }
					showMessageDialog(null, "Ny saldo: " + saldo.saldoen.getSaldo());
					System.exit(0);
				default:
					return;
			}
		}
	}
}