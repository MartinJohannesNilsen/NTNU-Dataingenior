import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;

public class SocketTjenerWeb {
    public static void main(String[] args) throws IOException {
        final ServerSocket serverSocket = new ServerSocket(8080);
        System.out.println("Serveren lytter nå på port 8080");
        boolean ferdig = false;
        while(!ferdig){
            try(Socket klient = serverSocket.accept()){
                InputStreamReader readConnection = new InputStreamReader(klient.getInputStream());
                BufferedReader reader = new BufferedReader(readConnection);
                PrintWriter writer = new PrintWriter(klient.getOutputStream(), true);
                String list = "";

                String header = reader.readLine();
                while(!header.equals("")){
                    list += "<li>" + header + "</li>";
                    header = reader.readLine();
                }

                Date now = new Date();
                String res = "HTTP/1.0 200 OK\nContent-Type: text/html; charset=utf-8\n\n\n" +
                        "<HTML><BODY>" +
                        "<H1> Hei :) Du har koblet deg opp til min enkle web-tjener </h1>\n" +
                        "Header fra klient er:" +
                        "<ul>" +
                        list +
                        "</ul>" +
                        "</BODY></HTML>";

                klient.getOutputStream().write(res.getBytes("UTF-8"));
                reader.close();
                writer.close();
            }
        }
    }
}
