

import java.io.*;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

class GPS {
    private Kant kanter;
    private Sted steder;
    private Node noder;
    private int[] rute;

    GPS(String kantnavn, String nodenavn, String stednavn) {
        System.out.println("Laster inn veikart ...");
        kanter = lesKanter(kantnavn);
        steder = lesSteder(stednavn);
        noder = lesNoder(nodenavn);
        System.out.println("Oppretter reiserute ...");
        System.out.println();
    }

    void AStar(String fra, String til) {
        AStar aStarAlgo = new AStar();
        int[] rute = aStarAlgo.naviger(steder.getNode(fra), steder.getNode(til), noder, kanter.nodes, fra, til);
        rute(rute);

        System.out.println();
        System.out.println(isEqual(rute) ? "A* har like ruter som Dijkstras!" : "A* har IKKE!!!! like ruter som Dijkstras!");
    }

    void dijkstras(String fra, String til) {
        Dijkstra dijkstra = new Dijkstra();
        rute = dijkstra.naviger(steder.getNode(fra), steder.getNode(til), kanter.nodes, fra, til);
        rute(rute);
    }

    private void rute(int[] route) {
        System.out.println("Ruten går gjennom:");
        for (int aRoute : rute) {
            String name = steder.getName(aRoute);
            if (name != null) System.out.println(name);
        }
    }

    private boolean isEqual(int[] otherRoute) {
        for (int i = 0; i < rute.length; i++) {
            if (rute[i] != otherRoute[i]) return false;
        }
        return true;
    }

    static void info(String alg, int totalNodesProcessed, int antNodesBetween, int length, long totalTime, String fra, String til) {
        System.out.println(alg + " (" + totalTime + "ms):");
        System.out.println("Reiseveien fra " + fra + " til " + til + " har totalt " + antNodesBetween + "noder");
        System.out.println("Algoritmen trenger å hente ut følgende antall noder fra køen: " + totalNodesProcessed + "\n");
        //Trenger skrive ut tid i timer, minutter og sekunder
        int lengdeISekunder = (int) Math.floor(length / 100);
        int sekunder = lengdeISekunder % 60;
        int timer = lengdeISekunder / 60;
        int minutter = timer % 60;
        timer = timer / 60;
        System.out.println("Din estimerte reiserute tar " + timer + "t" + minutter + "m" + sekunder + "s");
    }

    static Kant lesKanter(String filnavn) {
        String line;
        String[] line2;
        Kant kant = null;
        try (BufferedReader br = new BufferedReader(new FileReader(filnavn))) {
            kant = new Kant(Integer.parseInt(br.readLine().trim().split("\\s")[0]));
            line = br.readLine();
            while (line != null) {
                line2 = line.trim().split("\\s+");
                kant.addNode(Integer.parseInt(line2[0]), Integer.parseInt(line2[1]), Integer.parseInt(line2[2]));
                line = br.readLine();
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
            ioe.printStackTrace();
        }

        return kant;
    }

    static Node lesNoder(String filnavn) {
        String line;
        String[] line2;
        Node node = null;

        try (BufferedReader br = new BufferedReader(new FileReader(filnavn))) {

            node = new Node(Integer.parseInt(br.readLine().trim()));
            line = br.readLine();

            while (line != null) {
                line2 = line.trim().split("\\s+");
                node.addLocation(Integer.parseInt(line2[0]), Double.parseDouble(line2[1]), Double.parseDouble(line2[2]));
                line = br.readLine();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return node;
    }

    static Sted lesSteder(String filnavn) {
        String line;
        String[] line2;
        Sted steder = new Sted();
        try (BufferedReader br = new BufferedReader(new FileReader(filnavn))) {
            /*--- HashMap så trenger ikke å vite antall plasser, hopp over antall plasser linja ---*/
            br.readLine();
            line = br.readLine();
            while (line != null) {
                line2 = line.trim().split("\\s+");
                steder.addPlace(Integer.parseInt(line2[0]), line2[2].substring(1, line2[2].length() - 1));
                line = br.readLine();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return steder;
    }

    public void skrivTilFil (String filnavn){
        try {
            BufferedWriter outputWriter = null;
            outputWriter = new BufferedWriter(new FileWriter(filnavn));
            for (int aRoute : rute) {
                outputWriter.write(noder.getLongLat(aRoute)[0] + ", " + noder.getLongLat(aRoute)[1]);
                outputWriter.newLine();
            }
            outputWriter.flush();
            outputWriter.close();
        }
        catch(IOException e) {
            e.printStackTrace();
        }
    }
}
