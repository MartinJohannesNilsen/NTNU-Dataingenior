import java.util.ArrayList;

/**
 * The coordinator in the two-phase commit protocol
 */
public class TransactionManager {
    private final String prepare = "prepare";
    private final String commit = "commit";
    private final String abort = "abort";

    /**
     * Broadcasts string to the participants declared in the participants parameter. 
     * To do this the method spawns a new thread for each participant which then handles the communication with the participant.
     * The thread sends a message and waits for a response. 
     * If the response is empty, the participant is assumed to have disconnected and the corresponding response is set to false.
     * See {@link #tryStage(String, ThreadClientHandler)}
     * Each participant and its corresponding response is put into a tuple and added to the final ArrayList returned by the method.
     * @param participants
     * @param msg
     * @return an ArrayList containing tuples of participants and their respective responses.
     */
    private ArrayList<Object[]> broadcastWResponse(ArrayList<ThreadClientHandler> participants, String msg){
        ArrayList<Object[]> out = new ArrayList<>(); // Put responses and threads responsible for response in here
        ArrayList<Thread> workingThreads = new ArrayList<>();

        if(msg.equals("prepare")){
            Server.logger.logWithSysOut("Prompt sent to participants to prepare for commit, awaiting answers...");
        }else if(msg.equals("commit")){
            Server.logger.logWithSysOut("Prompt sent to participants to commit, awaiting answers...");
        }

        if(participants.size() > 1){
            try{
                for(ThreadClientHandler t : participants){
                    Thread newThread = new Thread(() -> {
                        out.add(tryStage(msg, t));
                    });
                    workingThreads.add(newThread);
                    newThread.start(); 
                }
                for(Thread t : workingThreads) t.join(); // Join all threads before returning
            } catch(InterruptedException e){
                System.out.println("Thread interrupted...");
            }

        } else{
            ThreadClientHandler p = participants.get(0);
            out.add(tryStage(msg, p));
        }
        return out;
    }

    /**
     * Sends a message to the designed participant and waits for a response. If the received response is empty, the participant is assumed to have disconnected and the corresponding response is set to false.
     * @param msg
     * @param t
     * @return an Object tuple containing the participant and its response.
     */
    private Object[] tryStage(String msg, ThreadClientHandler t){
        String response = t.msgWithResponse(msg); // Send msg to participant and await response
        
        if(!response.equals("") && response != null){  // Checking that message is properly received
            Server.logger.logWithSysOut("Got a response! Response was: " + response);
        }
        return new Object[]{response, t};
    }
    
    /**
     * Helper method checking result of the {@link #broadcastWResponse(ArrayList, String)} method.
     * Returns false if a participant did not answer true.
     * @param participants
     * @param msg
     * @param retry parameter declaring whether or not this is an assessment used to retry
     * @return true/false depending on the outcome of the vote.
     */
    private boolean assess(ArrayList<ThreadClientHandler> participants, String msg, boolean retry){
        boolean ok = true;
        
        ArrayList<Object[]> responses = broadcastWResponse(participants, msg);
        for(Object[] o : responses){
            if(!Boolean.parseBoolean((String) o[0])){
                if(retry){ // If retry is true, retry() has already been called, and we should therefore not call it again!
                    ok = false;
                    Server.logger.logWithSysOut("A participant failed");
                    break;
                } else{
                    if(!retry((ThreadClientHandler) o[1], msg)){
                        ok = false;
                        Server.logger.logWithSysOut("A participant failed");
                        break;
                    }
                }
            }
        }
        return ok;
    }

    /**
     * Helper method. Calls {@link #assess(ArrayList, String)} with "prepare" as String argument.
     * @param participants
     * @param retry parameter declaring whether or not this is a retried prepare stage
     * @return result of {@link #assess(ArrayList, String)}
     */
    private boolean prepare(ArrayList<ThreadClientHandler> participants, boolean retry){
        Server.logger.logWithSysOut("\nPhase 1:\nPrompting all participants to prepare...");
        return assess(participants, "prepare", retry);
    }

    /**
     * Helper method. Calls {@link #assess(ArrayList, String)} with "commit" as String argument.
     * @param participants
     * @param retry parameter declaring whether or not this is a retried commit-phase
     * @return result of {@link #assess(ArrayList, String)}
     */
    private boolean commit(ArrayList<ThreadClientHandler> participants, boolean retry){
        Server.logger.logWithSysOut("\nPhase 2:\nPrompting all participants to commit...");
        return assess(participants, "commit", retry);
    }


    /**
     * Method used to retry failed stages of the transaction for a participant. When the max number of retries is reached, the method returns false, resulting in a failed transaction.
     * @param participant
     * @param msg
     * @return
     */
    private boolean retry(ThreadClientHandler participant, String msg){
        int maxAttempts = 3;
        ArrayList<ThreadClientHandler> helper = new ArrayList<>();
        helper.add(participant);
        boolean ok = false;
        
        for(int i = 0; i < maxAttempts; i++){
            System.out.println("\nRetrying " + (i+1) + ". time for the failed " + msg + " phase...");
            
            try{
                Thread.sleep(3000);
            } catch(InterruptedException e){
                System.out.println("Interrupted in sleep phase");
            }

            if(msg.equalsIgnoreCase(prepare)){
                if(prepare(helper, true)){ 
                    ok = true;
                    break;
                }
            } else{
                if(commit(helper, true)){
                    ok = true;
                    break;
                }
            }
        }
        return ok;
    }

    /**
     * Handles the transaction process for the given participants.
     * If either {@link #prepare(ArrayList)} or {@link #commit(ArrayList)} fails, this method calls {@link #rollback()}. This results in the transaction failing, and the participants are notified of the failure.
     * @param participants
     * @return true or false depending on the outcome of the prepare and commit stages.
     */
    public boolean executeTransaction(ArrayList<ThreadClientHandler> participants){
        boolean success = true;
       
        Server.logger.logWithSysOut("--------------------------\nTransaction has been initialized!\n--------------------------");
        
        boolean ready = prepare(participants, false);
        boolean commited = false;
        if(ready){
            Server.logger.logWithSysOut("All participants ready. Attempting commit...");
            commited = commit(participants, false);
            
            if(commited){
                for(ThreadClientHandler t : participants){
                    t.msgNoResponse("Global commit succesful!");
                }
                Server.logger.logWithSysOut("\nGlobal commit succesful!");
            } else{
                success = false;
                rollback(participants);
            }
        } else{
            success = false;
            rollback(participants);
        }
        return success;
    }
    
    /**
     * Mock-method notifying all participants of a failed transaction.
     */
    private void rollback(ArrayList<ThreadClientHandler> participants){
        for(ThreadClientHandler t : participants) {
            t.msgNoResponse("abort");
        }
        Server.logger.logWithSysOut("Rollback...");
    }
}