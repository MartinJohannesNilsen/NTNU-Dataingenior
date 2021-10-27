import java.util.Random;

public class Øving1 {

    static int[] lagArray(int antDager, int MaksForskjell){
        Random random = new Random();
        int[] array = new int[antDager];
        for (int i = 0; i < antDager; i++) {
            int randomnumber = random.nextInt((MaksForskjell)) - (MaksForskjell / 2);
            array[i] = randomnumber;
        }
        return array;
    }

    static int finnHøyesxteVerdi(int[] array){
        int høyesteVerdi = 0;
        for(int i = 0; i < array.length; i++){
            if(i>høyesteVerdi) høyesteVerdi=i;
        }
        return høyesteVerdi;
    }

    static int findIndex(int[] array, int value){
        int index = 0;
        for(int i=0; i<array.length; i++) {
            if (array[i] == value) index = i;
        }
        return index;
    }

    static void bestProfitt(int[] kursdifferansetabell){
        int[] besteprofitt = {0,0,0};
        int høyesteVerdi = 0;
        for(int i = 0; i < kursdifferansetabell.length; i++){
            int kurs = 0;
            for(int j = i; j < kursdifferansetabell.length; j++) {
                kurs += kursdifferansetabell[j];
                if (kurs > høyesteVerdi) {
                    høyesteVerdi = kurs;
                    besteprofitt[0] = i;
                    besteprofitt[1] = j;
                    besteprofitt[2] = høyesteVerdi;
                }
            }
        }
        /*
        System.out.println("Beste profitt får du ved å kjøpe på dag " + (besteprofitt[0]) + ", med salgsdato "
                + (besteprofitt[1]+1) + ", og profitten er da " + besteprofitt[2]);
        */
    }

    static long tidtaker(int Antallkjøringer){
        long time = 0;
        for(int i = 0; i<Antallkjøringer; i++){
            int[] kursdifferanser = lagArray(10000, 1000); //Dobling av 10000 til 20000 bør gi 4dobbel-tid, noe det gjør
            long start = System.nanoTime();
            bestProfitt(kursdifferanser);
            long finish = System.nanoTime();
            long timeElapsed = finish - start;
            time += timeElapsed;
        }
        return time;
    }

    public static void main(String[] args){
        //int[] kursdifferanser = lagArray(10, 1000);
        //int[] kursdifferanser = {2, 3, -4, 0, 0, 5, -6};
        //int[] kursdifferanser = {-1, 3, -9, 2, 2, -1, 2, -1, -5};
        //bestProfitt(kursdifferanser);
        int antallKjøringer = 1000;
        long tid = tidtaker(antallKjøringer);
        System.out.println("Med " + antallKjøringer + " kjøringer tar det " + tid + "ns");
    }
}





/*
    static void bestProfitt(int[] kursdifferansetabell){
        int[] profitt = new int[kursdifferansetabell.length]; //Her lagres de ulike profittene
        int[] besteprofitt = {0,0,0};
        for(int i = 0; i < profitt.length; i++){
            int kurs = 0;
            for(int j = i; j < profitt.length; j++){
                kurs += kursdifferansetabell[j];
                profitt[j] = kurs;
            }
            int HøyesteProfittFraDenneDagen = finnHøyesteVerdi(profitt);
            if(HøyesteProfittFraDenneDagen>besteprofitt[2] || besteprofitt[2]==0) {
                int kjøpsdato = i;
                int salgsdato = findIndex(profitt, HøyesteProfittFraDenneDagen);
                besteprofitt[0] = kjøpsdato;
                besteprofitt[1] = salgsdato;
                besteprofitt[2] = HøyesteProfittFraDenneDagen;
            }
            profitt = new int[kursdifferansetabell.length];
        }
        System.out.println("Beste profitt får du ved å kjøpe på dag " + (besteprofitt[0]+1) + ", med salgsdato "
                + (besteprofitt[1]+1) + ", og profitten er da " + besteprofitt[2]);
    }
    */
