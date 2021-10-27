import java.util.*;

class Automat {
    private int tilstand;
    private String inputAlfabet;
    private int[] aksepterteTilstander;
    private char[][] nesteTilstandTabell; 

    public Automat(String inputAlfabet, int[] aksepterteTilstander, char[][] nesteTilstandTabell){
        this.inputAlfabet = inputAlfabet;
        this.aksepterteTilstander = aksepterteTilstander;
        this.nesteTilstandTabell = nesteTilstandTabell;
    }

    public boolean sjekkInput(String input){
        tilstand = 0;
        for(int i = 0; i < input.length(); i++){
            int a = inputAlfabet.indexOf(input.charAt(i));
            tilstand = nesteTilstandTabell[tilstand][a];
        }

        for(int i = 0; i < aksepterteTilstander.length; i++){
            if(aksepterteTilstander[i] == tilstand) return true;
        }
        return false;
    }

    public static void main(String[] args){
        //8c1
        String inputAlfabet = "01";
        int[] aksepterteTilstander = new int[1];
        char[][] nesteTilstandTabell = new char[4][2];
        
        //Setter aksepterte tilstander
        aksepterteTilstander[0] = 2;

        //Setter NesteTilstandTabell
        nesteTilstandTabell[0][0] = 1;
        nesteTilstandTabell[0][1] = 2;
        nesteTilstandTabell[1][0] = 1;
        nesteTilstandTabell[1][1] = 2;
        nesteTilstandTabell[2][0] = 2; 
        nesteTilstandTabell[2][1] = 3;
        nesteTilstandTabell[3][0] = 3; 
        nesteTilstandTabell[3][1] = 3;

        Automat a = new Automat(inputAlfabet, aksepterteTilstander, nesteTilstandTabell);
        String input = "";
        System.out.println("Inputstring '" + input + "' blir " + a.sjekkInput(input));
        input = "010";
        System.out.println("Inputstring '" + input + "' blir " + a.sjekkInput(input));
        input = "111";
        System.out.println("Inputstring '" + input + "' blir " + a.sjekkInput(input));
        input = "010110";
        System.out.println("Inputstring '" + input + "' blir " + a.sjekkInput(input));
        input = "001000";
        System.out.println("Inputstring '" + input + "' blir " + a.sjekkInput(input));


        //8c2
        inputAlfabet = "ab";
        aksepterteTilstander = new int[1];
        nesteTilstandTabell = new char[5][2];
        
        //Setter aksepterte tilstander
        aksepterteTilstander[0] = 3;

        //Setter NesteTilstandTabell
        nesteTilstandTabell[0][0] = 1;
        nesteTilstandTabell[0][1] = 2;
        nesteTilstandTabell[1][0] = 4;
        nesteTilstandTabell[1][1] = 3;
        nesteTilstandTabell[2][0] = 3; 
        nesteTilstandTabell[2][1] = 4;
        nesteTilstandTabell[3][0] = 3; 
        nesteTilstandTabell[3][1] = 3;
        nesteTilstandTabell[4][0] = 4; 
        nesteTilstandTabell[4][1] = 4;

        Automat b = new Automat(inputAlfabet, aksepterteTilstander, nesteTilstandTabell);
        input = "";
        System.out.println("Inputstring '" + input + "' blir " + b.sjekkInput(input));
        input = "abbb";
        System.out.println("Inputstring '" + input + "' blir " + b.sjekkInput(input));
        input = "aaab";
        System.out.println("Inputstring '" + input + "' blir " + b.sjekkInput(input));
        input = "babab";
        System.out.println("Inputstring '" + input + "' blir " + b.sjekkInput(input));
    
    
    
    }
}