import java.awt.*;
import javax.swing.*;
class Vindu extends JFrame {
	public Vindu(String tittel) {
		setTitle(tittel);
		setSize(500, 500);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		Tegning tegningen = new Tegning();
		add(tegningen);
	}
}

class Tegning extends JPanel {
	public void paintComponent(Graphics tegneflate){
		super.paintComponent(tegneflate);
		setBackground(Color.white);
		
		//Tegner hovedsirkel
		tegneflate.setColor(Color.yellow);
		tegneflate.fillOval(40, 40, 400, 400);
		tegneflate.setColor(Color.black);
		tegneflate.drawOval(40, 40, 400, 400);
		
		//Tegner venstre øyne
		tegneflate.setColor(Color.white);//Bakgrunn
		tegneflate.fillOval(130, 150, 80, 80);
		tegneflate.setColor(Color.black);//Omriss
		tegneflate.drawOval(130, 150, 80, 80);
		tegneflate.setColor(Color.black);//Pupill
		tegneflate.fillOval(155, 175, 30, 30);
		
		//Tegner høyre øyne
		tegneflate.setColor(Color.white);//Bakgrunn
		tegneflate.fillOval(270, 150, 80, 80);
		tegneflate.setColor(Color.black);//Omriss
		tegneflate.drawOval(270, 150, 80, 80);
		tegneflate.setColor(Color.black);//Pupill
		tegneflate.fillOval(295, 175, 30, 30);
		
		//Tegner munn
		tegneflate.setColor(Color.black);
		tegneflate.fillArc(145, 180, 200, 200, -180, 180);
	}
}

class MartinsSmiley {
	public static void main(String[] args){
		Vindu etVindu = new Vindu ("Martins Smiley");
		etVindu.setVisible(true);
	}
}





