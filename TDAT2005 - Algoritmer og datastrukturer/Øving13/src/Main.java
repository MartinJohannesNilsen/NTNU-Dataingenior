
public class Main {
    public static void main(String[] args) {
        String fra = "Trondheim";
        String til = "Oslo";

        System.out.println("\nStarter MJN Maps\n-------------------------\n");
        GPS gps = new GPS("Kanter.txt", "Noder.txt", "Interessepunkt.txt");
        gps.dijkstras(fra, til);
        System.out.println("\n-------------------------\n");
        gps.AStar(fra, til);
        System.out.println("\n-------------------------\n");
        gps.skrivTilFil("Koordinater.txt");
        System.out.println("Koordinater skrevet til fil!");
    }
}