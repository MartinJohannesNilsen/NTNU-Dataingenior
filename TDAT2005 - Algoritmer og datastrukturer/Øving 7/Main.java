import java.io.BufferedReader;
import java.io.FileReader;

public class Main {
    public static void main(String[] args) {
        BufferedReader buf = null;
        Graf graf = null;

        try {
            buf = new BufferedReader(new FileReader("/Users/martinnilsen/OneDrive - NTNU/Fag/Dataingeniør 2. år/TDAT2005 Algoritmer og Datastrukturer/Øvinger/Øving 7/Grafer/L7g5.txt"));
            graf = new Graf(buf);
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println(graf.skrivBFS(graf.getNodetabell()[5]));
        System.out.println(graf.skrivTopoSort());
    }
}