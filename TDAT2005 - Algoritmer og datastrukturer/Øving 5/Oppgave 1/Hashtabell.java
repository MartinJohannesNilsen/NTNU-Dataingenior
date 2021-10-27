import java.io.BufferedReader;
import java.io.FileReader;

class Hashtabell {
    public Node[] tabell;
    int kollisjoner;
    int elementer;

    public Hashtabell(int tabellStørrelse){
        this.tabell = new Node[tabellStørrelse];
        this.kollisjoner = 0;
        this.elementer = 0;
    }

    public void fyllTabell(String fil){
        try{
            FileReader input = new FileReader(fil);
            BufferedReader buf = new BufferedReader(input);
            String tekst = null;

            while((tekst = buf.readLine()) != null){
                elementer++;
                Node node = new Node(tekst, null);
                leggTilIHashtabell(node, finnSum(tekst));
            }
            buf.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public int finnSum(String tekst){
        int sum = 0;
        for(int i = 0; i < tekst.length(); i++){
            char tegn = tekst.charAt(i);
            sum += tegn*(i+1);
        }
        return sum;
    }

    public void leggTilIHashtabell(Node node, int sum){
        int hash = divhash(sum, tabell.length);
        if(tabell[hash] == null){
            tabell[hash] = node;
        }else{
            kollisjoner++;
            System.out.println(node.finnNavn() + " krasjer med " + tabell[hash].finnNavn());
            node.settNeste(tabell[hash]);
            tabell[hash] = node;
        }
    }

    public int divhash(int sum, int størrelse){
        return sum % størrelse;
    }

    public double finnLastfaktor(){
        return (double) elementer / (double) tabell.length;
    }

    public boolean finnesILista(String navn){
        try{
            int hash = divhash(finnSum(navn), tabell.length);
            if(tabell[hash].finnNavn().equals(navn)){
                return true;
            }
            while(tabell[hash].finnNeste() != null){
                int teller = 0;
                if(tabell[teller].finnNavn().equals(navn)){
                    return true;
                }
                teller++;
            }
            return false;
        }catch(NullPointerException e){
            return false;
        }
    } 

    public static void main(String[] args){
        Hashtabell h = new Hashtabell(113);
        h.fyllTabell("/Users/martinnilsen/OneDrive - NTNU/Fag/Dataingeniør 2. år/TDAT2005 Algoritmer og Datastrukturer/Øvinger/Øving 5/Oppgave 1/navn.txt");
        System.out.println("Antall kollisjoner: " + h.kollisjoner);
        System.out.println("Antall elementer: " + h.elementer);
        System.out.println("Lastfaktor: " + h.finnLastfaktor());
        String navn = "Nilsen,Martin Johannes";
        if(h.finnesILista(navn)){
            System.out.println(navn + " finnes i lista");
        }else{
            System.out.println(navn + " finnes ikke i lista");
        }
    } 
}