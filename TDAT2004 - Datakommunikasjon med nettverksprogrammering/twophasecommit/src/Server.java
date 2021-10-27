import java.io.*;
import java.net.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.logging.Level;

/**
 * A class in which has two main tasks; to create and manage the connection with each participant, and give the execute-message to the transaction manager when the user wants to start a transaction.
 */
public class Server {
    static final int PORT = 8080;
    public static ArrayList<ThreadClientHandler> threads = new ArrayList<>();
    public static TransactionManager TM = new TransactionManager();
    static final String SESSION_ID = createUniqueID();
    public final static Logwriter logger = new Logwriter("Server", 0);
    private static Thread[] running = new Thread[2];
    private static ServerSocket ss = null;

    /**
     * Creates a unique id used to organize the logs of each session
     * @return the current date and time in one line
     */
    public static String createUniqueID(){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyddMMHHmm");  
        LocalDateTime now = LocalDateTime.now();  
        return (dtf.format(now));
    }

    /**
     * Returns an ArrayList containing ThreadClientHandlers involved in the transaction that invoked this method.
     * This prevents any further clients from joining the transaction while it is ongoing.
     * Also eases detection of disconnected participants. 
     * @return participants involved in current transaction.
     */
    public static ArrayList<ThreadClientHandler> getCurrentParticipants(){
        ArrayList<ThreadClientHandler> out = new ArrayList<>();
        for(ThreadClientHandler t : threads){
            out.add(t);
        }
        return out;
    }

    /**
     * This method tries to close all the programs ongoing threads and disconnect from all participants when invoked.
     */
    private static void tearDown(){
        logger.log("Teardown start");
        logger.logWithSysOut("Interrupt-flagging server-threads...");
        for(Thread t : running){
            t.interrupt();
        }

        try{
            ss.close();
        } catch(IOException e){
            e.printStackTrace();
            logger.logError(Level.WARNING, "IO-Exception");
        }


        logger.logWithSysOut("Interrupting participant-threads");
        for(ThreadClientHandler participantThread : threads){
            participantThread.msgNoResponse("stop");
            participantThread.interrupt();
        }
        logger.log("Teardown complete");
    }

    /**
     * The main flow of the server. First it initiates and creates a folder for the logs.
     * Then it starts two threads; one handles incoming connection requests and spawns new threads in the form of {@link ThreadClientHandler} for every new connection. 
     * The other server thread takes care of transactions.
     * @param args
     */
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        File file = new File("../out/logs/" + SESSION_ID);
        file.mkdirs();
        logger.log("Server started, awaiting participants...");

        // Handling and adding incoming connections
        running[0] = new Thread(() -> {
            ss = null;
            Socket clientSocket = null;
            
            try {
                ss = new ServerSocket(PORT);
            } catch(IOException e) {
                e.printStackTrace();
            }

            while(!Thread.currentThread().isInterrupted()) {
                Socket sock = null;
                try {
                    sock = ss.accept();
                } catch(SocketException e){
                    System.out.println("Server socket or client socket closed.");
                } catch(IOException e) {
                    e.printStackTrace();
                } 

                if(sock != null){
                    clientSocket = sock;
                    ThreadClientHandler t = new ThreadClientHandler(clientSocket, logger);
                    t.start();
                    threads.add(t);
                }
            }
            System.out.println("Connection thread interrupted, returning...");
            return;
        });

        // Transaction handling
        running[1] = new Thread(() -> {
            while(!Thread.currentThread().isInterrupted()){
                logger.logWithSysOut("\nTo start a transaction, press enter:");
                String input = in.nextLine().trim(); // Waits for user input to start transaction with current participants
                if(input.equalsIgnoreCase("")){
                    ArrayList<ThreadClientHandler> currentParticipants = getCurrentParticipants();
                    boolean ok = TM.executeTransaction(currentParticipants);

                    if(ok){
                        logger.logWithSysOut("[Transaction successful]");
                    } else{
                        logger.logWithSysOut("[Transaction failed]");
                    }
                } else if(input.equalsIgnoreCase("stop")){
                    in.close();
                    tearDown();
                }
            }
            System.out.println("Transaction thread interrupted, returning...");
            return;
        });

        for(Thread t : running) t.start();
    }
}