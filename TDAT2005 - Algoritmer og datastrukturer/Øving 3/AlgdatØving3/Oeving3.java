import java.util.Random;

class Oeving3{
    
    private void bytt(int[] tabell, int i, int j){
        int k = tabell[j];
        tabell[j] = tabell[i];
        tabell[i] = k;
    }

    private int splitt(int[] tabell, int v, int h) {
        int pivot = v + (h - v) / 2;
        int pivotverdi = tabell[pivot];
        int mindre = v - 1;
        bytt(tabell, pivot, h);
        for (int i = v; i < h; i++) {
            if (tabell[i] < pivotverdi) {
                mindre++;
                bytt(tabell, mindre, i);
            }
        }
        bytt(tabell, mindre + 1, h);
        return mindre + 1;
    }
    
    private void innsettingsSort(int[] tabell, int venstre, int hoeyre){
        for(int i = venstre+1; i<hoeyre; i++){
            int bytt = tabell[i];
            //sett tabell[i] på rett plass
            int j = i-1;
            while(j >= venstre && tabell[i] > bytt){
                tabell[j+1] = tabell[j];
                --j;
            }
            tabell[j+1] = bytt;
        }
    }

    private void quicksortV2(int[] tabell, int venstre, int hoeyre){
        if(hoeyre - venstre >= 150){
            int delepos = splitt(tabell, venstre, hoeyre);
            quicksortV2(tabell, venstre, delepos-1);
            quicksortV2(tabell, delepos+1, hoeyre);
        }else{
            innsettingsSort(tabell, venstre, hoeyre);
        }
    }    

    public boolean testOmAlgoritmeFungerer(Object object){
        if(object instanceof int[] != true) return false;
        int[] tabell = (int[]) object;
        for(int i = 0; i<tabell.length-2; i++){
            if(tabell[i+1] >= tabell[i]) return true;
        }
        return false;
    }

    public int[] lagTabell(int tabellStoerrelse, int tallStoerrelse){
        int[] tabell = new int[tabellStoerrelse];
        Random random = new Random();
        for(int i = 0; i<tabell.length; i++){
            tabell[i] = random.nextInt(tallStoerrelse);
        }
        return tabell;
    }

    public long tidtaker(int Antallkjøringer){
        long time = 0;
        long time2 = 0;
        Oeving3 obj = new Oeving3();
        for(int i = 0; i<Antallkjøringer; i++){
            int[] tabell = obj.lagTabell(1000000, 10000);
            
            //Tar tiden på quicksortV2
            int sum1 = 0;
            for(int j = 0; j<tabell.length; j++){
                sum1 += tabell[j];
            }
            long start = System.nanoTime();
            int venstre = tabell[0];
            int hoeyre = tabell[tabell.length-1];
            obj.quicksortV2(tabell, venstre, hoeyre);
            long finish = System.nanoTime();
            int sum2 = 0;
            for(int k = 0; k<tabell.length; k++){
                sum2 += tabell[k];
            }
            if(sum2!=sum1){
                System.out.println("Har skjedd en feil!");
                break;
            }

            long timeElapsedQuicksortV2 = finish - start;
            time += timeElapsedQuicksortV2;
            
        }
        return time/Antallkjøringer; //Dette gir tiden i ns per gang algoritmen kjøres, første med v2 og andre med v1
    }
    

    public static void main(String[] args){
        Oeving3 obj = new Oeving3();
        /*
        int[] tabell = obj.lagTabell(100000, 1000000);
        int venstre = tabell[0];
        int hoeyre = tabell[tabell.length-1];
        obj.quicksortV2(tabell, venstre, hoeyre);
        if(!obj.testOmAlgoritmeFungerer(tabell)) {
            System.out.println("Sorteringsalgoritmen fungerer ikke");
        }else{
            System.out.println("Sorteringsalgoritmen fungerer");
        }
        */
        System.out.println("Tid for quicksortv2: " + obj.tidtaker(1000) + "ns");
    }
}




/*
* Må lese kapittel 3
*/




/*
    private int splitt(int[] tabell, int venstre, int hoeyre){
        int iv,ih;
        int m = median3sort(tabell, venstre, hoeyre);
        int dv = tabell[m];
        bytt(tabell, m, hoeyre-1);
        for(iv = venstre, ih = hoeyre - 1;;){
            while(tabell[++iv]<dv);
            while(tabell[--ih]>dv);
            if(iv>=ih) break;
            bytt(tabell, iv, ih);
        }
        bytt(tabell, iv, hoeyre-1);
        return iv;
    }

     private int median3sort(int[] tabell, int venstre, int hoeyre){
        int m = (venstre+hoeyre)/2;
        if(tabell[venstre]>tabell[hoeyre]) bytt(tabell, venstre, hoeyre);
        if(tabell[m]>tabell[hoeyre]){
            bytt(tabell, m, hoeyre);
            if(tabell[venstre]>tabell[m]) bytt(tabell, venstre, m);
        }
        return m;
    }
    */

  /*
    //Denne tidtakeren må implementere en sorteringstest etterhvert
    public long[] tidtaker(int Antallkjøringer){
        long time = 0;
        long time2 = 0;
        Oeving3 obj = new Oeving3();
        for(int i = 0; i<Antallkjøringer; i++){
            int[] tabell = obj.lagTabell(100000, 100000);
            
            //Tar tiden på quicksortV2
            int sum1 = 0;
            for(int j = 0; j<tabell.length; j++){
                sum1 += tabell[j];
            }
            long start = System.nanoTime();
            int venstre = tabell[0];
            int hoeyre = tabell[tabell.length-1];
            obj.quicksortV2(tabell, venstre, hoeyre);
            long finish = System.nanoTime();
            int sum2 = 0;
            for(int k = 0; k<tabell.length; k++){
                sum2 += tabell[k];
            }
            if(sum2!=sum1){
                System.out.println("Har skjedd en feil!");
                break;
            }

            //Tar tiden på quicksort
            sum1 = 0;
            for(int j = 0; j<tabell.length; j++){
                sum1 += tabell[j];
            }
            long start2 = System.nanoTime();
            obj.quicksort(tabell, venstre, hoeyre);
            long finish2 = System.nanoTime();
            sum2 = 0;
            for(int k = 0; k<tabell.length; k++){
                sum2 += tabell[k];
            }
            if(sum2!=sum1){
                System.out.println("Har skjedd en feil!");
                break;
            }

            long timeElapsedQuicksortV2 = finish - start;
            time += timeElapsedQuicksortV2;

            long timeElapsedQuicksort = finish2 - start2;
            time2 += timeElapsedQuicksort;
            
        }
        long[] tider = {time/Antallkjøringer, time2/Antallkjøringer};
        return tider; //Dette gir tiden i ns per gang algoritmen kjøres, første med v2 og andre med v1
    }
    */