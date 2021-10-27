import static javax.swing.JOptionPane.*;
class Test{
	public static void main(String[] args){
		String inputBoks = showInputDialog(null, "Input:");
		NyString tekst = new NyString(inputBoks);
		
		//System.out.println(tekst.getTekst());
		//System.out.println(tekst.utførForkorting());
		
		
		String innlestBokstav = "a";
		System.out.println(tekst.utførFjerningAvTegn(innlestBokstav));
		
	}
}