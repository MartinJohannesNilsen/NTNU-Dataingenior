import java.util.Random;
class MinRandom{
	Random randomObjekt = new Random();

	public int nesteHeltall(int nedre, int ovre){
		int tall = ovre - nedre;
		return nedre + randomObjekt.nextInt(tall);
	}

	public double nesteDesimaltall(double nedre, double ovre){
		double tall = ovre++ - nedre;
		return nedre + randomObjekt.nextDouble()*tall;
	}
	
	public static void main(String[] args){
		MinRandom randomTall = new MinRandom();
		System.out.println("Heltall: " + randomTall.nesteHeltall(123, 456));
		System.out.println("Desimaltall: " + randomTall.nesteDesimaltall(1.2, 3.4));
	}
}