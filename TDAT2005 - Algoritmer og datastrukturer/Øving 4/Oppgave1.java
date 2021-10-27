class Oppgave1 {
    EnkelLenke liste = new EnkelLenke();

    public void overlevelsesPlassering(int antallPersoner, int drapsIntervall){
        for(int i = 1; i < antallPersoner+1; i++){
            Node temp = new Node((i), null);
            liste.leggTilNode(temp);
        }
        System.out.println("Antall personer: " + antallPersoner);
        System.out.println("Drapsintervall: " + drapsIntervall);
        liste.skrivUtLenke();

        long startTid = System.nanoTime();
        liste.utførDrap(drapsIntervall);
        long sluttTid = System.nanoTime();
        System.out.println(sluttTid - startTid + " ns");
    } 
    public static void main(String[] args){
        Oppgave1 o = new Oppgave1();
        o.overlevelsesPlassering(41, 3);
    }
}

class Node {
    private int element;
    public Node neste;
    public Node(int e, Node n){
        element = e;
        neste = n;
    }

    public int finnElement(){return element;}
    public Node finnNeste(){return neste;}
}

class EnkelLenke {
    private Node hode = null;
    private Node hale = null;
    private int antElementer = 0;

    public int finnAntall(){return antElementer;}
    public Node finnHode(){return hode;}
    public Node finnHale(){return hale;}

    public void leggTilNode(Node n){
        if(hode == null){
            hode = n;
            hale = n;
            n.neste = hode;
            antElementer++;
        }else{
            hale.neste = n;
            hale = n;
            hale.neste = hode;
            antElementer++;
        }
    }

    public Node fjern(Node n){
        Node forrige = null;
        Node denne = hode;
        while(denne != null && denne != n){
            forrige = denne;
            denne = denne.neste;
        }
        if(denne != null) {
            if (forrige != null) forrige.neste = denne.neste;
            else hode = denne.neste;
            denne.neste = null;
            --antElementer;
            return denne;
        }else{
            return null;
        }
    }

    public void skrivUtLenke(){
        Node node = hode;
        do{
            System.out.print(node.finnElement() + " ");
            node = node.neste;
        }while(node != hode);
        System.out.println("");
    }

    public void utførDrap(int drapsIntervall){  //Kunne brukt modulus og delelighet med dødsintervallet, med en teller, men synes dette er en bedre løsning
        Node node = hode;
        while(antElementer > 1){
            for(int i = 1; i<drapsIntervall; i++) node = node.neste;
            Node neste = node.neste;
            if(node == hode) hode = neste;
            fjern(node);
            node = neste;
            skrivUtLenke();
        }
    }
}







/*while(antElementer > 1){
            if(teller % drapsIntervall == 0){
                //System.out.println(" Fjerner: " + current.finnElement());
                Node neste = current.neste;

                if (current == hode) {
                    hode = neste;
                }
                fjern(current);
                current = neste;
                skrivUtLenke();
            }else{
                current = current.neste;
            }
            teller++;
        }*/

/*
class Oppgave1 {
    dobbeltLenketListe liste = new dobbeltLenketListe();

    public int overlevelsesPlassering(int antallPersoner, int drapsIntervall){
        liste.settInnfremst(1);
        for(int i = 2; i<antallPersoner+1; i++){liste.settInnBakerst(i);}
        Node node = liste.finnNr(1);
        while(liste.finnAntall() > 1){
            for(int i = 1; i<drapsIntervall; i++) node = node.neste;
            liste.fjern(node);
        }
        Boolean avslutt = false;
        Node x = liste.finnHode();
        int plassering = 0;
        while(!avslutt){
            if(x.neste != null){
                plassering++;
                avslutt = true;
                break;
            }
            plassering++;
            x = x.neste;
        }
        return plassering;
    } 
    public static void main(String[] args){
        Oppgave1 o = new Oppgave1();
        System.out.println(o.overlevelsesPlassering(10, 4));
    }
}

class Node {
    int element;
    Node neste;
    Node forrige;
    
    public Node(int e, Node n, Node f){
        this.element = e;
        this.neste = n; 
        this.forrige = f;
    }
    
    public double finnElement(){return element;}
    public Node finnNeste(){return neste;}
    public Node finnForrige(){return forrige;}

    
}

class dobbeltLenketListe {
    private Node hode = null;
    private int antElementer = 0;
    
    public int finnAntall(){return antElementer;}
    public Node finnHode(){return hode;}

    public void settInnfremst(int verdi){
        hode = new Node(verdi, hode, null);
        if(hode.neste.forrige == null) hode.neste.forrige = hode;
        else hode.neste.forrige = hode;
        ++antElementer;
    }

    public void settInnBakerst(int verdi){
        Node ny = new Node(verdi, null, hode.neste.forrige);
        if(hode.neste.forrige != null) hode.neste.forrige.neste = ny;
        hode.neste.forrige = ny;
        ++antElementer;
    }

    public Node fjern(Node n){
        if(n.forrige == null) n.forrige.neste = n.neste;
        else hode = n.neste;
        if(n.neste != null) n.neste.forrige = n.forrige;
        else hode.neste.forrige = n.forrige;
        n.neste = null;
        n.forrige = null;
        --antElementer;
        return n;
    }

    public Node finnNr(int nr){
        Node denne = hode;
        if(nr<antElementer){
            for(int i = 0; i<nr; ++i){
                denne = denne.neste;
            }
            return denne;
        }
        else return null;
    }
}
*/

