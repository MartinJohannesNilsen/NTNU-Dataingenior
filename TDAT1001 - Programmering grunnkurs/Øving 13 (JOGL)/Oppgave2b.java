
import java.awt.*;
import javax.swing.*;

import com.jogamp.opengl.GL2;
import com.jogamp.opengl.glu.GLU;
import com.jogamp.opengl.GLAutoDrawable;
import com.jogamp.opengl.GLEventListener;
import com.jogamp.opengl.awt.GLCanvas;
import com.jogamp.opengl.util.gl2.GLUT;


/**
 * NeHe Lesson #2 (JOGL 2 Port): Basic 2D Shapes
 * @author Tomas Holt, based on code from Hock-Chuan Chua (May 2012)
 * @version October 2016
 */

/* Main class which extends GLCanvas. This means that this is a OpenGL canvas.
   We will use OpenGL commands to draw on this canvas.
   This implementation has no animation or user input.
*/
public class Oppgave2b extends GLCanvas implements GLEventListener {
   // constants
   private static String TITLE = "Hater JOGL";
   private static final int CANVAS_WIDTH = 320;  // width of the drawable
   private static final int CANVAS_HEIGHT = 240; // height of the drawable
  
   // Setup OpenGL Graphics Renderer 
   private GLU glu;  // for the GL Utility
   
   /** Constructor to setup the GUI for this Component */
   public Oppgave2b() {
      this.addGLEventListener(this);
   }
   
// ------ Implement methods declared in GLEventListener (init,reshape,display,dispose)          

   /**
    * Called immediately after the OpenGL context is initialized. Can be used 
    * to perform one-time initialization. Run only once.
    */
   public void init(GLAutoDrawable drawable) {
      GL2 gl = drawable.getGL().getGL2();      // get the OpenGL graphics context
      glu = new GLU();                         // get GL Utilities
      gl.glClearColor(0.0f, 0.0f, 0.0f, 0.0f); // set background (clear) color
      gl.glEnable(GL2.GL_DEPTH_TEST);           // enables depth testing
      gl.glHint(GL2.GL_PERSPECTIVE_CORRECTION_HINT, GL2.GL_NICEST); // best perspective correction
   }

   /**
    * Handler for window re-size event. Also called when the drawable is 
    * first set to visible
    */
   public void reshape(GLAutoDrawable drawable, int x, int y, int width, int height) {
      GL2 gl = drawable.getGL().getGL2();  // get the OpenGL 2 graphics context

      if (height == 0) height = 1;   // prevent divide by zero     
      float aspect = (float)width / height;

      //Set the view port (display area) to cover the entire window
      //gl.glViewport(0, 0, width, height);

      // Setup perspective projection, with aspect ratio matches viewport
      gl.glMatrixMode(GL2.GL_PROJECTION);  // choose projection matrix
      gl.glLoadIdentity();             // reset projection matrix
      glu.gluPerspective(45.0, aspect, 0.1, 100.0); // fovy, aspect, zNear, zFar

      // Enable the model-view transform
      gl.glMatrixMode(GL2.GL_MODELVIEW);
      gl.glLoadIdentity(); // reset
   }
   
   public void tegnKube(GL2 gl, float[] punkter){
      int p1 = 0;
      int p2 = 3;
      int p3 = 6;
      int p4 = 9;
      int p5 = 12;
      int p6 = 15;
      int p7 = 18; 
      int p8 = 21;
      
      gl.glTranslatef(-10f, 0.0f, -30.0f);
      
      gl.glBegin(GL2.GL_LINE_LOOP); 
         gl.glVertex3fv(punkter, p1);
         gl.glVertex3fv(punkter, p2);
         gl.glVertex3fv(punkter, p3);
         gl.glVertex3fv(punkter, p4);
         gl.glVertex3fv(punkter, p1);
         gl.glVertex3fv(punkter, p2);
         gl.glVertex3fv(punkter, p6);
         gl.glVertex3fv(punkter, p7);
         gl.glVertex3fv(punkter, p3);
         gl.glVertex3fv(punkter, p4);
         gl.glVertex3fv(punkter, p8);
         gl.glVertex3fv(punkter, p7);
         gl.glVertex3fv(punkter, p8);
         gl.glVertex3fv(punkter, p4);
         gl.glVertex3fv(punkter, p1);
      gl.glEnd();
   }
   /**
    * Called by OpenGL for drawing
    */
   public void display(GLAutoDrawable drawable) {
      GL2 gl = drawable.getGL().getGL2();  // get the OpenGL 2 graphics context
      gl.glClear(GL2.GL_COLOR_BUFFER_BIT | GL2.GL_DEPTH_BUFFER_BIT); // clear color and depth buffers
      gl.glLoadIdentity();  // reset the model-view matrix
      
      float[] punkter = {2f,2f,0f, 2f,6f,0f, 6f,6f,0f, 6f,2f,0f, 3f,3f,0f, 3f,7f,0f, 7f,7f,0f, 7f,3f,0f};
      tegnKube(gl, punkter);
      
      gl.glTranslatef(1f, 0.0f, 0.0f);
      
      GLUT kube = new GLUT();
      kube.glutWireCube(3);
        
   }

   /** 
    * Called before the OpenGL context is destroyed. Release resource such as buffers. 
    */
   public void dispose(GLAutoDrawable drawable) { }
   
   /** The entry main() method to setup the top-level JFrame with our OpenGL canvas inside */
   public static void main(String[] args) {
       GLCanvas canvas = new Oppgave2b();
       canvas.setPreferredSize(new Dimension(CANVAS_WIDTH, CANVAS_HEIGHT));
       
       final JFrame frame = new JFrame(); // Swing's JFrame or AWT's Frame
       frame.getContentPane().add(canvas);
       frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);//stop program
       frame.setTitle(TITLE);
       frame.pack();
       frame.setVisible(true);      
   }
}
