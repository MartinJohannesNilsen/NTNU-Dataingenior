import java.io.*;
import java.net.Socket;
import java.net.SocketException;
import java.util.Scanner;
import java.util.logging.Level;

/**
 * The class representing each participant in the transaction. Gets a prompt from server and votes back if the prepare and/or commit succeeds.
 */
public class Participant {
    private String IPADDRESS;
    private Scanner in;
    private BufferedReader connReader;
    private PrintWriter connWriter;
    private static Logwriter logger;
    private boolean connected = false;
    
    /**
     * Private constructor instantiating connections with the server side and setting up IO.
     */
    private Participant(){
        while(!connected){
            try{
                in = new Scanner(System.in);
                System.out.println("IP-address for server (enter for localhost):");
                String ipadressInput = in.nextLine();
                if(ipadressInput.trim().equals("")){
                    IPADDRESS = "localhost";
                }else{
                    IPADDRESS = ipadressInput;
                };
                Socket conn = new Socket(IPADDRESS, 8080);
                this.connReader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                this.connWriter = new PrintWriter(conn.getOutputStream(), true);
                this.connected = true;
            } catch(IOException e){
                logger.logErrorWithSysOut(Level.WARNING, "Write in a correct IP-adress!");
            }
        }
    }
    
    /**
     * Asks participant if preparation for the commit succeeded.
     * No actual preparation is implemented since this is only an illustration. 
     * Instead the user is prompted to answer true or false to simulate either a successful, or a failed commit.
     */
    private void prepare(){
        logger.logWithSysOut("Did you manage to prepare for commit? Vote \"true\" or \"false\":");
        String participantResponse = in.nextLine(); // Waits for input from user (true/false)
        connWriter.println(participantResponse);
        logger.log(participantResponse);
    }

    /**
     * Prompting the participant to vote true or false depending on the outcome of their commit phase.
     */
    private void commit(){
        logger.logWithSysOut("Did you manage to commit? Vote \"true\" or \"false\":");
        String msgToManager = in.nextLine();
        connWriter.println(msgToManager);
        logger.log(msgToManager);
    }

    /**
     * Method made to simulate a rollback. Prints a failed transaction message to System.out and to log-file. 
     */
    private void abort(){
        logger.logWithSysOut("One of the participants failed, Transaction manager prompts a rollback!");
    }

    /**
     * Method made to limit exception handling boilerplate when receiving messages from the transaction manager.
     * @return message received from transaction manager
     */
    private String getMsg(){
        String msg = "";
        try{
            msg = connReader.readLine();
        } catch(SocketException e){
            logger.logWithSysOut("Error reading message. Server likely disconnected...\nClosing connection...");
            connected = false;
        } catch(IOException e){
            e.printStackTrace();
            logger.logError(Level.WARNING, "IO-exception");
        }
        return msg;
    }
  
    public static void main(String[] args) throws Exception {
        Participant p = new Participant();
        int participantID = Integer.parseInt(p.connReader.readLine());
        logger = new Logwriter("Participant", participantID);

        logger.logWithSysOut("\nParticipant " + participantID + ": Awaiting prompt from Transaction Manager...");
        while(p.connected){
            String msgFromManager = "";

            // The following loops are used to match the retry functionality in the transaction manager.
            while((msgFromManager = p.getMsg()).equalsIgnoreCase("prepare")){
                logger.logWithSysOut("Transaction manager wants you to prepare for commit");
                p.prepare();
            }

            while(msgFromManager.equalsIgnoreCase("commit")){
                logger.logWithSysOut("Transaction manager wants you to commit");
                p.commit();
                msgFromManager = p.getMsg();
            }

            // Checking if application should be stopped.
            if(msgFromManager.equalsIgnoreCase("abort")){
                p.abort();
            } else if(msgFromManager.equalsIgnoreCase("stop")){
                logger.logWithSysOut("Server stopping and disconnecting");
                return;
            }
            
            if(p.connected) logger.logWithSysOut("\nParticipant " + participantID + ": Awaiting prompt from Transaction Manager...");
        }
    }
}