import java.io.*;
import java.net.*;
import java.nio.ByteBuffer;
import java.nio.IntBuffer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.BitSet;
import java.util.PriorityQueue;

class Node implements Comparable<Node>{
    char tegn; 
    int freq;
    Node leftChild; 
    Node rightChild;

    public Node(char tegn, int freq, Node left, Node right){
        this.tegn = tegn;
        this.freq = freq;
        this.leftChild = left;
        this.rightChild = right;
    }
    
    Boolean erLøv(Node node) {
        if(node.leftChild == null && node.rightChild == null){
            return true;
        }
        return false;
    }

    @Override
    public int compareTo(Node node) {
        
        int freqSammenlikning = Integer.compare(this.freq, node.freq);
        if(freqSammenlikning != 0){
            return freqSammenlikning;
        }
        
        return Integer.compare(this.tegn, node.tegn);
        
        /*
        int out = -1;
        if(this.freq != node.freq){
            return (this.freq < node.freq)? -1 : 1;
        }
        // Hvis de har lik frekvens, sorter på leksigografisk verdi.
        if(this.tegn != '\0' && node.tegn == '\0' || this.tegn < node.tegn) out = 1;
        return out;
        */
    }
}

class HuffmanKomprimertRes {
    int[] frekvenstabell;
    String bitmønster;

    public HuffmanKomprimertRes(int[] frekvenstabell, String bitmønster){
        this.frekvenstabell = frekvenstabell;
        this.bitmønster = bitmønster;
    }
}

class huffmanKomprimering {
    final static int ANTALL_MULIGE_KARAKTERER = 256; //ASCII inneholder 256 ulike tegn
    String bitmønster = "";

    public Node byggHuffmantre(int[] freq) {
        /*
        //Prøvde å lage min egen sortering da jeg ikke trodde priorityqueue fungerte
        ArrayList<Node> kø = new ArrayList<>();

        /*
        //Først må jeg finne ut av hvor mange ulike tegn som finnes
        int forskjelligeTegn = 0;
        for(int i = 0; i<ANTALL_MULIGE_KARAKTERER; i++){
            if(freq[i] > 0){
                forskjelligeTegn++;
            }
        }

        //Så kjører jeg en forløkke der jeg legger inn i prioritetskøen i den rekkefølgen slik at den med høyest frekvens kommer først inn, for den skal sist ut
        
        int høyesteFrekvensSålangt = 0;
        char c = 0;
        for(int i = 0; i<forskjelligeTegn; i++){
            for(char j = 0; j<ANTALL_MULIGE_KARAKTERER; j++){
                if(freq[j]>høyesteFrekvensSålangt){
                    høyesteFrekvensSålangt = freq[j];
                    c = j;
                }
            }
            kø.add(new Node(c, høyesteFrekvensSålangt, null, null));
        }

        if(kø.size() == 1){
            kø.add(new Node('0', 1, null, null));
        }

        //I denne metoden må du hele tiden finne de med minst freq og slå disse sammen til køen har size 1
        int lavestefrekvens1 = 0;
        char en = 0;
        int lavestefrekvens2 = 0;
        char to = 0;
        while(kø.size() > 1){
            Collections.sort();
            Node left = prioritetskø.poll();
            Node right = prioritetskø.poll();
            Node forelder = new Node('0', left.freq + right.freq, left, right); //Bruker bare karakteren 0 fordi den trenger en karakter på foreldrenoden
            prioritetskø.add(forelder);
        }

        return kø.get(0);
        */


        //Fremgangsmåten er at man fyller en prioritetskø med noder og så begynner merge dem, før man står igjen med kun en node, en foreldrenode som vi returnerer. 
        PriorityQueue<Node> prioritetskø = new PriorityQueue<>();
        //Prioritetskø har alltid det minste elementet i toppen av "heapen"
        
        for(char i = 0; i < ANTALL_MULIGE_KARAKTERER; i++){
            //Hvis det finnes en karakter i denne tabellen, altså at frekvensen er mer enn 0, så legger man den til i prioritetskøen
            if(freq[i] > 0){
                prioritetskø.add(new Node(i, freq[i], null, null));
            }
        }
        
        //Legger inn denne dersom prioritetskøen skulle være 1, altså at det finnes en node men derav ikke kan finnes barnenoder, og "treet" vil da bestå av kun en node. Derav ikke et tre
        if(prioritetskø.size() == 1){
            prioritetskø.add(new Node('\0', 1, null, null));
        }

        //Hvis du har flere noder, så merger du disse etter Huffmans-prinsippet
        while(prioritetskø.size() > 1){
            Node left = prioritetskø.poll();
            Node right = prioritetskø.poll();
            Node forelder = new Node('0', left.freq + right.freq, left, right); //Bruker bare karakteren 0 fordi den trenger en karakter på foreldrenoden
            prioritetskø.add(forelder);
        }
    
        return prioritetskø.poll();
    }

    public HuffmanKomprimertRes komprimer(String filadresse) throws Exception{
        ArrayList<Character> charTabell = lesFraFil(new DataInputStream(new BufferedInputStream(new FileInputStream(filadresse))));
        System.out.println("Fil innlest");
        int[] freq = byggFrekvensTabell(charTabell);
        Node rot = byggHuffmantre(freq);
        lagBitmønster(rot, charTabell);
        HuffmanKomprimertRes resultat = new HuffmanKomprimertRes(freq, bitmønster);
        return resultat;
    }

    private void lagBitmønster(Node forelderNode, ArrayList<Character> charTabell) {
        /*
        * I denne metoden skal vi lage et bitmønster basert på charTabellens oppbygning.
        * Jeg må iterere gjennom charTabellen og plusse på stringen for hvert tegn i denne tabellen
        * Jeg må bare rekursivt søke gjennom og sjekke både til venstre og høyre
        */

        bitmønster = "";
        for(int i = 0; i<charTabell.size(); i++){
            encode(forelderNode, bitmønster, charTabell.get(i));
        }
    }

    public void encode(Node root, String bitmønster, char tegn){
        if (root == null)
			return;

		// found a leaf node
		if (root.leftChild == null && root.rightChild == null && root.tegn == tegn) {
			this.bitmønster = bitmønster;
		}

		encode(root.leftChild, bitmønster + "0", tegn);
        encode(root.rightChild, bitmønster + "1", tegn);
    }
    
    private static int[] byggFrekvensTabell(ArrayList<Character> data){
        int[] freq = new int[ANTALL_MULIGE_KARAKTERER]; 
        for(char character : data){
            freq[character]++;
        }
        return freq;
    }


    private ArrayList<Character> lesFraFil(DataInputStream innfil) {
        try{
            ArrayList<Character> charTabell = new ArrayList<>();
            int antallBytes = innfil.available();  
            byte[] tab = new byte[antallBytes];  
            innfil.read(tab);  
            for (byte a : tab) {  
                charTabell.add((char) a);   
            }  
            return charTabell;
        } catch(Exception e){
            e.printStackTrace();
        } 
        return null;
    }

    byte[] createByteArray(String res){
        BitSet bs = new BitSet(res.length());
        for(int i = 0; i < res.length(); i++){
            if(res.charAt(i) == '1'){
                bs.set(i);
            } else if(res.charAt(i) == '0'){
                bs.clear(i);
            } 
        }
        return bs.toByteArray();
    }

    byte[] createByteArray(int[] frekvenstabell) {
        ArrayList<Byte> byteArrayList = new ArrayList<>();
        for(int i = 0; i < frekvenstabell.length; i++){
            if(frekvenstabell[i] != 0){
                byteArrayList.add((byte) i);
                byte[] freq = ByteBuffer.allocate(4).putInt(frekvenstabell[i]).array();
                byteArrayList.add(freq[0]);
                byteArrayList.add(freq[1]);
                byteArrayList.add(freq[2]);
                byteArrayList.add(freq[3]);      
            }
        }

        byte[] resultArray = new byte[byteArrayList.size()];
        for(int i = 0; i < byteArrayList.size(); i++){
            resultArray[i] = byteArrayList.get(i);
        }
        return resultArray;
    }

    private void skrivResultatTilFil(HuffmanKomprimertRes res){
        try{
            DataOutputStream out = new DataOutputStream(new BufferedOutputStream(new FileOutputStream("compressed.txt"))); 
            byte[] bitmønsterByteArray = createByteArray(res.bitmønster);
            
            //Må gjøre om int[] til byte[]
            byte[] freqByteArray = createByteArray(res.frekvenstabell);
            ArrayList<Byte> result = new ArrayList<>();
            out.writeInt(freqByteArray.length);
            out.write(freqByteArray);
            out.write(bitmønsterByteArray);
            
            /*
            ByteBuffer byteBuffer = ByteBuffer.allocate(res.frekvenstabell.length * 4);        
            IntBuffer intBuffer = byteBuffer.asIntBuffer();
            intBuffer.put(res.frekvenstabell);
            byte[] frekvenstabellByteArray = byteBuffer.array();
            byte[] frekvenstabellByteArrayLengde = ByteBuffer.allocate(4).putInt(frekvenstabellByteArray.length).array();  
            */
            //Står nå med 4 byte[], to for lengden på bitmønster og frekvenstabell
            //Må skrive disse 4 til fil i en gitt rekkefølge, slik at jeg kan hente de inn igjen

            /*
            FileOutputStream fos = new FileOutputStream("compressed.txt");
            fos.write(frekvenstabellByteArrayLengde);
            fos.write(bitmønsterByteArrayLengde);
            fos.write(frekvenstabellByteArray);
            fos.write(bitmønsterByteArray);
            fos.close();
            */

            /*
            FileOutputStream fos = new FileOutputStream("test.txt");
            PrintWriter out = new PrintWriter("test.txt");
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(res.frekvenstabell);
            out.write(res.bitmønster);
            fos.close();
            out.close();
            oos.close();
            */
        } catch(Exception e){
            e.printStackTrace();
        } 
    }

    public void decompress(String filnavn){
        try{
            DataInputStream in = new DataInputStream(new BufferedInputStream(new FileInputStream(filnavn)));
            
            byte[] data = new byte[in.available()];
            in.read(data);
            
            
            /*
            ArrayList<Byte> bytes = new ArrayList<>();
            while(in.available() > 0){
                bytes.add(in.readByte());               
            }
            byte[] data = new byte[bytes.size()];
            for(int i = 0; i < data.length; i++){
                data[i] = bytes.get(i);
            }
            */

            byte[] frekvenstabellLengdeBytes = new byte[4];
            for(int i = 0; i < 4; i++){
                frekvenstabellLengdeBytes[i] = data[i];
            }
            int frekvenstabellLengde = ByteBuffer.wrap(frekvenstabellLengdeBytes).getInt();

            /*
            int[] freq = new int[256];
            int karakterInt;
            int frekvens;
            byte[] frekvensByteArray;
            for(int i = 4; i < frekvenstabellLengde+4; i++){
                karakterInt = (int) data[i];
                i++;
                frekvensByteArray = new byte[4];
                for(i = i; i < 4; i++){
                    frekvensByteArray[i] = data[i];
                }
                freq[karakterInt] = ByteBuffer.wrap(frekvensByteArray).getInt();
            }
            */

            int[] freq = new int[256];
            for(int i = 4; i < frekvenstabellLengde; i+= 5){
                byte[] frequencies = new byte[4];
                for(int j = 1; j < 5; j++){
                    frequencies[j-1] = data[i+j];
                }
                int sum = ByteBuffer.wrap(frequencies).getInt();
                freq[data[i] &0xFF] = sum;
            }
            
            String bitmønster = "";
            byte[] decompressed = new byte[data.length-frekvenstabellLengde-4];
            for(int i = 0; i < decompressed.length; i++){
                decompressed[i] = data[i+frekvenstabellLengde+4];
            }
            //lag tabell som kun har komprimert data (byte)
            BitSet bs = BitSet.valueOf(decompressed);
            for(int i = 0; i < bs.length(); i++){
                if(bs.get(i)){
                    bitmønster += '1';
                } else {
                    bitmønster += '0';
                }
            }
            bitmønster += '0';

            
            String tekst = omgjørTilString(bitmønster, freq);

            FileOutputStream fos = new FileOutputStream("out.txt");
            DataOutputStream outStream = new DataOutputStream(new BufferedOutputStream(fos));
            //ObjectOutputStream outStream = new ObjectOutputStream(fos);
            Files.writeString(Paths.get("out.txt"), tekst);
            //outStream.writeUTF(tekst);
            //outStream.close();
        } catch(Exception e){
            e.printStackTrace();
        }
/*
        ArrayList<Character> characters = new ArrayList<>();
        int[] freq = byggFrekvensTabell(characters);
        Node root = byggHuffmantre(freq);
        lagBitmønster(root, characters);
        System.out.println(bitmønster);
  */
  
    }

    private String omgjørTilString(String bitmønster, int[] freq) {
        StringBuilder res = new StringBuilder();
        Node root = byggHuffmantre(freq);
        Node n = root;
        ArrayList<Character> charArray = new ArrayList<>();
        for(char ch : bitmønster.toCharArray()){
            if(ch == '1'){
                n = n.rightChild;
            }else if(ch == '0'){
                n = n.leftChild;
            }
            if(n.erLøv(n)){
                charArray.add(n.tegn);
                n = root;
            }
        }
        String result = "";
        for(int i = 0; i < charArray.size(); i++){
            result += charArray.get(i).toString();
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        String filadresse = "lorem.txt";
        huffmanKomprimering a = new huffmanKomprimering();
        System.out.println("Starter komprimering ...");
        HuffmanKomprimertRes res = a.komprimer(filadresse);
        System.out.println("Komprimering fullført!");
        a.skrivResultatTilFil(res);
        System.out.println("Starter dekomprimering ...");
        a.decompress("compressed.txt");
        System.out.println("Prosess fullført!");
    }
}   