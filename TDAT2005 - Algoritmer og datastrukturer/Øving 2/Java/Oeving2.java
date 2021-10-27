class Oeving2{

    //Oppgave 2.1-1
    public static double variabel1(double x, int n){
        if(n<=0){
            return 1;
        }else{
            return x*variabel1(x,n-1);
        }
    }

    //Oppgave 2.2-3
    public static double variabel2(double x, int n){
        if(n <= 0){
            return 1.0;
        }else if(n%2 != 0){ //oddetall
            return x*variabel2(x*x,((n-1)/2));
        } else if(n%2 == 0){ //partall 
            return variabel2(x*x,(n/2));
        }
        return 0;
    }

    static long tidtakerForVariabel1(int Antallkjøringer, double x, int n){
        long time = 0;
        for(int i = 0; i<Antallkjøringer; i++){
            long start = System.nanoTime();
            double a = variabel1(x, n);
            long finish = System.nanoTime();
            long timeElapsed = finish - start;
            time += timeElapsed;
        }
        return time;
    }

    static long tidtakerForVariabel2(int Antallkjøringer, double x, int n){
        long time = 0;
        for(int i = 0; i<Antallkjøringer; i++){
            long start = System.nanoTime();
            double a = variabel2(x, n);
            long finish = System.nanoTime();
            long timeElapsed = finish - start;
            time += timeElapsed;
        }
        return time;
    }

    static long tidtakerForMathPow(int Antallkjøringer, double x, int n){
        long time = 0;
        for(int i = 0; i<Antallkjøringer; i++){
            long start = System.nanoTime();
            double a = Math.pow(x, n);
            long finish = System.nanoTime();
            long timeElapsed = finish - start;
            time += timeElapsed;
        }
        return time;
    }

    public static void main(String[] args){
        //System.out.println(variabel1(2,4)); //Oppgave 2.1-1
        //System.out.println(variabel2(2,4)); //Oppgave 2.2-3

        //Skal nå ta tiden på kjøringer av de to ulike metodene
        int Antallkjøringer = 1000;
        double x = 1.001;
        int n = 5000;
        System.out.println("Tidtaking med " + Antallkjøringer + " antall kjøringer, og variabel " + x + "^(" + n + "):");
        System.out.println("Metode 1 bruker " + tidtakerForVariabel1(Antallkjøringer, x, n) + " ns");
        System.out.println("Metode 2 bruker " + tidtakerForVariabel2(Antallkjøringer, x, n) + " ns");
        System.out.println("Javas Math.pow bruker " + tidtakerForMathPow(Antallkjøringer, x, n) + " ns");
    }
}

/*
* Gjorde feil oppgave, dette er oppgave 2.1 av oppgavene helt i slutten av kapittelet

class Oeving2{

    static int finnStørsteFellesFaktor(int a, int b){
        int x = 0;
        if(b == 0){
            x = a;
            return x;
        }
        int størst = b;
        if(a > b) størst = a;
        for(int i = 1; i<størst+1; i++){
            if((a%i==0) && (b%i==0)){
                x = i;
            }
        }
        return x;
    }

    public static void main(String[] args){
        System.out.println("Største faktor er " + finnStørsteFellesFaktor(16,24));
    }
}

*/