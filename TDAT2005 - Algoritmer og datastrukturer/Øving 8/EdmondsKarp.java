import java.io.BufferedReader;
import java.io.FileReader;
import java.util.*;
public class EdmondsKarp {
	public static void main(String[] args) throws Exception {
		//Først må jeg lese inn fil
		//String fil = "/Users/martinnilsen/OneDrive - NTNU/Fag/Dataingeniør 2. år/TDAT2005 Algoritmer og Datastrukturer/Øvinger/Øving 8/Grafer/flytgraf1.txt";
		//String fil = "/Users/martinnilsen/OneDrive - NTNU/Fag/Dataingeniør 2. år/TDAT2005 Algoritmer og Datastrukturer/Øvinger/Øving 8/Grafer/flytgraf2.txt";
		//String fil = "/Users/martinnilsen/OneDrive - NTNU/Fag/Dataingeniør 2. år/TDAT2005 Algoritmer og Datastrukturer/Øvinger/Øving 8/Grafer/flytgraf3.txt";
		BufferedReader buf = new BufferedReader(new FileReader(fil));

		String[] linje = buf.readLine().trim().split(" ");
		int noder = Integer.parseInt(linje[0]);
		int kanter = Integer.parseInt(linje[1]);
		
		//int kilde = Integer.parseInt(javax.swing.JOptionPane.showInputDialog("Hvilken node skal være kilden?"));
		//int sluk = Integer.parseInt(javax.swing.JOptionPane.showInputDialog("Hvilken node skal være sluket?"));
		
		//Graf 1
		int kilde = 0;
		int sluk = 7;

		//Graf 2
		//int kilde = 0;
		//int sluk = 15;

		//Graf 3
		//int kilde = 0;
		//int sluk = 15;


		Node[] graf = new Node[noder];

		for (int i = 0; i < noder; i++)
			graf[i] = new Node();

		for (int i = 0; i < kanter; i++) {
			linje = buf.readLine().trim().split(" ");
			int franode = Integer.parseInt(linje[0]);
			int tilnode = Integer.parseInt(linje[1]);
			int kapasitet = Integer.parseInt(linje[2]);
			
			Kant a = new Kant(franode , tilnode , 0 , kapasitet);
			Kant b = new Kant(tilnode , franode , 0 , 0);
			
			a.setRevers(b);
			b.setRevers(a);
			
			graf[franode].kanter.add(a);
			graf[tilnode].kanter.add(b);
		}

		int maxFlyt = 0;
		String resString = "Maksimum flyt fra " + kilde + " til " + sluk + " med Edmond-Karp"; 
		resString += "\nØkning : Flytøkende vei";
		ArrayList<ArrayList<Integer>> res = new ArrayList<>();

		while (true) {
			// Parent array brukes til å lagre vei
			// Mens parent[i] lagrer Kant som blir brukt for å få node i
			Kant[] parent = new Kant[noder];
			
			ArrayList<Node> q = new ArrayList<>();
			q.add(graf[kilde]);
			
			// BFS finner korteste flytøkende vei
			while (!q.isEmpty()) {
				Node nåværende = q.remove(0);
				
				//Sjekker at kanten ikke har blitt testet enda,
				//men at det samtidig er mulig å sende en flyt gjennom den. 
				for (Kant i : nåværende.kanter)
					if (parent[i.tilnode] == null && i.tilnode != kilde && i.kapasitet > i.flyt) {
						parent[i.tilnode] = i;
						q.add(graf[i.tilnode]);
					}
			}

			//Hvis sluk ikke nås, fant en ikke en flytøkende vei.
			//Algoritmen stoppes da og printer ut maxFlyt.
			if (parent[sluk] == null)
				break;
			
			//Hvis man når sluk, pusher vi mer flyt gjennom veien
			int økning = Integer.MAX_VALUE;
			
			//Begynner bygge resultatArrayList kalt res
			res.add(new ArrayList<Integer>());
			res.get(res.size()-1).add(sluk);

			//Finner maximum flyt som kan bli pusha gjennom gitt vei ved å finne 
			//minimum gjensidig kapasitet av alle kantene i veien
			for (Kant i = parent[sluk]; i != null; i = parent[i.franode]){
				økning = Math.min(økning , i.kapasitet - i.flyt);
				res.get(res.size()-1).add(i.franode);
			}
			res.get(res.size()-1).add(økning);
			//res blir bygd opp med nodene i flytøkende feil, riktignok baklengs, og så legger vi på økningen til slutt for å ha den med. 
			//Vil når vi skriver ut bare skrive ut bakfra
			
			//Oppdaterer flyten og reversflyten
			for (Kant i = parent[sluk]; i != null; i = parent[i.franode]) {
				i.flyt += økning;
				i.revers.flyt -= økning;
			}
			maxFlyt += økning;
		}
		
		//Skal nå skrive ut i riktig rekkefølge
		for(int i = 0; i < res.size(); ++i){
			resString += "\n";
			resString += "    " + res.get(i).get(res.get(i).size()-1) + "    ";
			for(int j = res.get(i).size()-2; j > -1; --j){
				resString += res.get(i).get(j) + " ";
			}
		}
		resString += "\nMaksimal flyt ble " + maxFlyt;
		System.out.println(resString);
		buf.close();
	}
}

class Node {

	ArrayList<Kant> kanter = new ArrayList<>();

}

class Kant {
	int franode;
	int tilnode;
	int flyt;
	int kapasitet;
	Kant revers;

	public Kant(int franode, int tilnode, int flyt, int kapasitet) {
		this.franode = franode;
		this.tilnode = tilnode;
		this.flyt = flyt;
		this.kapasitet = kapasitet;
	}

	public void setRevers(Kant e) {
		revers = e;
	}

}