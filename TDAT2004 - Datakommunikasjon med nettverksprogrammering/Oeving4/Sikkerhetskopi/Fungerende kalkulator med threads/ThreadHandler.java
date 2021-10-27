import java.io.*;
import java.net.*;
class ThreadHandler extends Thread{
    private Socket forbindelse;
    private int id;

    public ThreadHandler(int id, Socket forbindelse){
        this.id = id;
        this.forbindelse = forbindelse;
    }

    public int getID(){return id;}

    @Override
    public void run() {
        try {
            /* Åpner strømmer for kommunikasjon med klientprogrammet */
            InputStreamReader leseforbindelse = new InputStreamReader(forbindelse.getInputStream());
            BufferedReader klientLeser = new BufferedReader(leseforbindelse);
            PrintWriter klientSkriver = new PrintWriter(forbindelse.getOutputStream(), true);

            /* Sender innledning til klienten */
            klientSkriver.println("Connection: " + id + "\nVelkommen til en enkel kalkulator. Hvilken operasjon ønsker du gjøre? \n1. Addisjon\n2. Subtraksjon\n3. Multiplikasjon\n4. Divisjon\n5. Avslutt");
            /* Mottar data fra klienten */
            boolean ferdig = false;
            while (!ferdig) {  // forbindelsen på klientsiden er lukket
                try {
                    int valg = Integer.parseInt(klientLeser.readLine());
                    double tall1 = Double.parseDouble(klientLeser.readLine());
                    double tall2 = Double.parseDouble(klientLeser.readLine());
                    String operand;
                    if (valg == 1) {
                        operand = " + ";
                    } else if (valg == 2) {
                        operand = " - ";
                    } else if (valg == 3) {
                        operand = " * ";
                    } else {
                        operand = " / ";
                    }
                    double[] resKalk;
                    resKalk = klientKalkulator(klientSkriver, klientLeser, valg, tall1, tall2);
                    klientSkriver.println(resKalk[0] + operand + resKalk[1] + " = " + resKalk[2]);
                    System.out.println("Klient: " + id + ", " + resKalk[0] + operand + resKalk[1] + " = " + resKalk[2]);
                } catch (NumberFormatException e) {
                    klientSkriver.println("Du må fylle inn et gyldig valg!");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            klientLeser.close();
            klientSkriver.close();
            forbindelse.close();
        }catch(IOException e){
            e.printStackTrace();
        }
    }

    private static double[] klientKalkulator(PrintWriter klientSkriver, BufferedReader klientLeser, int valg, double tall1, double tall2) throws IOException{
        try{
            double[] res = new double[3];
            res[0] = tall1;
            res[1] = tall2;
            if(valg == 1){
                res[2] = tall1 + tall2;
            } else if(valg == 2){
                res[2] = tall1 - tall2;
            } else if(valg == 3){
                res[2] = tall1 * tall2;
            } else if(valg == 4){
                res[2] = tall1 / tall2;
            }
            return res;
        } catch(NumberFormatException e){
        }
        return null;
    }
}
