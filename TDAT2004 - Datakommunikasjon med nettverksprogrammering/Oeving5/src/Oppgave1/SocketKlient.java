import java.io.*;
import java.net.*;
import java.util.Scanner;

public class SocketKlient {
    private DatagramSocket socket;
    private InetAddress address;
    private byte[] buf = new byte[256];
    private byte[] resBuf = new byte[256];


    public SocketKlient() throws Exception{
        socket = new DatagramSocket();
        address = InetAddress.getByName("localhost");
    }

    public String sendMessage(String msg) throws IOException{
        //First we send the message
        buf = msg.getBytes();
        DatagramPacket packet = new DatagramPacket(buf, buf.length, address, 1250);
        socket.send(packet);

        //Saves the two numbers sent
        String[] sentArray = msg.split(";")[0].split(":");
        String number1 = sentArray[0];
        String number2 = sentArray[2];

        //Then we receive it
        packet = new DatagramPacket(resBuf, resBuf.length);
        socket.receive(packet);
        String received = new String(
                packet.getData(), 0, packet.getLength());
        String[] resArray = received.split(":");
        String res = number1 + " " + resArray[0] + " " + number2 + " = " + resArray[1];
        return res;
    }

    public void close() {
        socket.close();
    }

    public static void main(String[] args) throws Exception{
        Scanner leserFraKommandovindu = new Scanner(System.in);
        System.out.println("Velkommen til en enkel kalkulator. Hvilken operasjon ønsker du gjøre? \n1. Addisjon\n2. Subtraksjon\n3. Multiplikasjon\n4. Divisjon\n5. Avslutt");
        Boolean ferdig = false;
        SocketKlient klient = new SocketKlient();
        while (!ferdig) {
            String res = "";
            System.out.println("-------------\nSkriv inn valg i fra menyen:\n-------------");
            int valg = leserFraKommandovindu.nextInt();
            if (valg > 0 && valg < 5) {
                System.out.println("Skriv inn tall 1");
                double tall1 = leserFraKommandovindu.nextDouble();
                res += tall1;
                if (valg == 1) {
                    res += ":1:";
                } else if (valg == 2) {
                    res += ":2:";
                } else if (valg == 3) {
                    res += ":3:";
                } else {
                    res += ":4:";
                }
                System.out.println("Skriv inn tall 2");
                double tall2 = leserFraKommandovindu.nextDouble();
                res += tall2;
                res += ";";
                String response = klient.sendMessage(res);
                System.out.println(response);
            } else if (valg == 5) {
                //Stenger først tjener
                klient.sendMessage("end");
                //Stenger så klientens forbindelse og avslutter
                klient.close();
                ferdig = true;
                break;
            } else {
                System.out.println("\nDu må skrive inn et gyldig valg! Prøv på nytt: \n");
            }
        }
    }
}