import java.io.IOException;
import java.nio.file.NoSuchFileException;
import java.io.File;
import java.util.logging.*;

/**
 * A class for logging both the server & transactionManager's (coordinator) and participants' (resource managers) work.
 */

public class Logwriter{
    public Logger logger;

    /**
    * Logging levels:
    *         SEVERE
    *         WARNING
    *         INFO
    *         CONFIG
    *         FINE
    *         FINER
    *         FINEST
    */
    
    /**
     * The constructor, creating a file for either the server or each of the participants
     * @param className The name of the class initiating the logger
     * @param ID An unique id given for separating each participant and giving them a log for themselves
     */
    public Logwriter(String className, int ID) {
            resetLogManager();
            String filename = className + "_" + ID;
            String filetype = ".log";
            String filepath = ID == 0 ? ("../out/logs/" + Server.SESSION_ID + "/" + className + filetype) : ("../out/logs/" + Server.SESSION_ID + "/" + filename + filetype);
            File file = new File(filepath);
            logger = Logger.getLogger(filepath.split("/")[3]);
        try{
            FileHandler fh = new FileHandler(filepath, true);
            logger.addHandler(fh);
            fh.setLevel(Level.ALL);
            SimpleFormatter format = new SimpleFormatter();
            fh.setFormatter(format);
        }catch(NoSuchFileException e){   
        }catch(IOException e){
            e.printStackTrace();
        }
    }

    /**
     * Resets the global LogManager-settings for ensuring that we can control the Level-settings
     */
    public void resetLogManager(){
        LogManager.getLogManager().reset();
    }

    /**
     * Logs an error to given file
     * @param level The level of error
     * @param msg The message in which will be logged
     */
    public void logError(Level level, String msg) {
        logger.log(level, msg);
    }

    /**
     * Logs an error to given file in addition to printing it out to the console
     * @param level The level of error
     * @param msg The message in which will be logged
     */
    public void logErrorWithSysOut(Level level, String msg) {
        logger.log(level, msg);
        System.out.println(msg);
    }
    
    /**
     * 
     */
    public void log(String msg) {
        logger.log(Level.INFO, msg);
    }
    
    public void logWithSysOut(String msg) {
        logger.log(Level.INFO, msg);
        System.out.println(msg);
    }

}
