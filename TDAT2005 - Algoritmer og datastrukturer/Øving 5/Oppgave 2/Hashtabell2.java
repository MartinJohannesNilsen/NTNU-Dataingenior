import java.util.HashMap;
import java.util.Random;

class Hashtabell2 {
    public int[] hashTabell;
    int[] intTabell;
    int antTall;
    
    public Hashtabell2(int hashTabellStørrelse, int antTall, int intStørrelse){
        this.hashTabell = new int[hashTabellStørrelse];
        this.intTabell = new int[antTall];
        this.antTall = antTall;
        fyllVanligTabell(antTall, intStørrelse);
    }

    private void fyllVanligTabell(int anttall, int intStørrelse){
        Random r = new Random();
        for(int i = 0; i<antTall; i++){
            intTabell[i] = r.nextInt(intStørrelse);
        }
    }

    public void leggTilIHashtabell(int tall){
        int hash = divhash(tall, hashTabell.length);
        if(hashTabell[hash] == 0){
            hashTabell[hash] = tall;
        }else{
            int hash2 = divhash2(tall);
            int c = 1;
            int nyHash = hash;
            while(c < hashTabell.length){
                if(hashTabell[nyHash] != 0){
                    nyHash = (hash2*c+hash)%hashTabell.length;
                    break;
                }
                c++;
            }
            hashTabell[nyHash] = tall;
        }
    }

    public int divhash(int sum, int størrelse){
        return sum % størrelse;
    }

    private int divhash2(int tall){ //Tar forbehold om at tabellstørrelsen er primtall
        return tall % (hashTabell.length-1) + 1;
    }

    public void fyllHashTabell(){
        for(int i = 0; i<intTabell.length; i++){
            leggTilIHashtabell(intTabell[i]);
        }
    }

    public void tidtaker(){
        long start = System.nanoTime();
        fyllHashTabell();
        long finish = System.nanoTime();
        long time = finish-start;
        System.out.println("Egen Hashfunksjon - Tid brukt: " + time/1000000 + "ms");
    }

    public void tidtakerJava(){
        long start = System.nanoTime();
        HashMap<Integer, Integer> hashmap = new HashMap<Integer, Integer>();
        for(int i = 0; i<intTabell.length; i++){
            hashmap.put(intTabell[i], intTabell[i]);
        }
        long finish = System.nanoTime();
        long time = finish-start;
        System.out.println("Javas HashMap - Tid brukt: " + time/1000000 + "ms");
    }

    public static void main(String[] args){
        Hashtabell2 h = new Hashtabell2(5100071, 5000000, 50000000);
        h.tidtaker();
        h.tidtakerJava();
    } 
}