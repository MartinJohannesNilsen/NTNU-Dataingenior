import java.io.*;
import java.net.*;
import java.util.Scanner;

/**
 * This class represents a thread handling one participant. One object instantiated belongs to one participant connected. 
 */
public class ThreadClientHandler extends Thread{
    private Socket conn;
    private BufferedReader reader;
    private PrintWriter writer;  
    private Scanner in;
    Logwriter logger;
    long id;

    /**
     * Constructor. Instantiates a ThreadClientHandler object for a connection with its own dedicated logger, and IO.
     * @param conn
     * @param logger
     */
    public ThreadClientHandler(Socket conn, Logwriter logger){
        this.conn = conn;
        this.logger = logger;
        try {
            InputStreamReader streamReader = new InputStreamReader(conn.getInputStream());
            this.reader = new BufferedReader(streamReader);
            this.writer = new PrintWriter(conn.getOutputStream(), true);
            this.in = new Scanner(System.in);
            this.id = Server.threads.size();
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Sends a message to the participant. Waits for response and returns the answer from participant.
     * @param msg
     * @return response from participant
     */
    public String msgWithResponse(String msg){
        String out = "";
        try{
            writer.println(msg);
            out = reader.readLine();
        } catch(IOException e){
            System.out.println("Sending of message went wrong, client likely disconnected...");
            Server.threads.remove(this);
        }
        return out;
    }

    /**
     * Sends message to participant.
     * @param msg
     */
    public void msgNoResponse(String msg){
        writer.println(msg);
    }

    /**
     * Thread stays in a while loop to keep connection alive until its interrupted() flag is set to true.
     */
    public void run() {
        try {
            logger.log("Participant connected! There are now " + Server.threads.size() + " participants!");
            writer.println(Server.threads.size()); // Sending participant ID
            
            while(!Thread.currentThread().isInterrupted()){}
            
            reader.close();
            writer.close();
            conn.close();
        } catch(NullPointerException e){
            Server.threads.remove(this);
            Thread.currentThread().interrupt();
        } catch(IOException e) {
            Server.threads.remove(this);
            Thread.currentThread().interrupt();
            e.printStackTrace();
        } catch(Exception e){
            Server.threads.remove(this);
            Thread.currentThread().interrupt();
            e.printStackTrace();
        }
    }
}