import java.io.*;
import java.net.*;
import java.util.Scanner;
class SocketKlient {
    public static void main(String[] args) throws Exception {
        final int PORTNR = 1250;

        /* Bruker en scanner til å lese fra kommandovinduet */
        Scanner leserFraKommandovindu = new Scanner(System.in);
        /*
        System.out.print("Oppgi navnet på maskinen der tjenerprogrammet kjører: ");
        String tjenermaskin = leserFraKommandovindu.nextLine();
        */
        String tjenermaskin = "dhcp-10-24-4-91.wlan.ntnu.no";
        Thread.sleep(3000);

        /* Setter opp forbindelsen til tjenerprogrammet */
        Socket forbindelse = new Socket(tjenermaskin, PORTNR);

        /* Åpner en forbindelse for kommunikasjon med tjenerprogrammet */
        InputStreamReader leseforbindelse = new InputStreamReader(forbindelse.getInputStream());
        BufferedReader leseren = new BufferedReader(leseforbindelse);
        PrintWriter skriveren = new PrintWriter(forbindelse.getOutputStream(), true);

        /* Leser innledning fra tjeneren og skriver den til kommandovinduet */
        String innledning1 = leseren.readLine();
        String innledning2 = leseren.readLine();
        String innledning3 = leseren.readLine();
        String innledning4 = leseren.readLine();
        String innledning5 = leseren.readLine();
        String innledning6 = leseren.readLine();
        String innledning7 = leseren.readLine();
        System.out.println(innledning1 + "\n" + innledning2 + "\n" + innledning3 + "\n" + innledning4 + "\n" + innledning5 + "\n" + innledning6 + "\n" + innledning7);

        /* Leser tekst fra kommandovinduet (brukeren) */
        Boolean ferdig = false;
        while (!ferdig) {
                System.out.println("-------------\nSkriv inn valg i fra menyen:\n-------------");
                int valg = leserFraKommandovindu.nextInt();
                if (valg > 0 && valg < 5) {
                    System.out.println("Skriv inn tall 1");
                    double tall1 = leserFraKommandovindu.nextDouble();
                    System.out.println("Skriv inn tall 2");
                    double tall2 = leserFraKommandovindu.nextDouble();
                    skriveren.println(valg);
                    skriveren.println(tall1);
                    skriveren.println(tall2);
                    String respons = leseren.readLine();  // mottar respons fra tjeneren
                    System.out.println(respons);
                } else if (valg == 5) {
                    ferdig = true;
                    break;
                } else {
                    System.out.println("\nDu må skrive inn et gyldig valg! Prøv på nytt: \n");
                }
        }

        /* Lukker forbindelsen */
        leseren.close();
        skriveren.close();
        forbindelse.close();
    }
}
