import lejos.hardware.motor.*;
import lejos.hardware.sensor.EV3TouchSensor;
import lejos.hardware.sensor.EV3ColorSensor;
import lejos.hardware.port.Port;
import lejos.hardware.Brick;
import lejos.hardware.BrickFinder;
import lejos.robotics.SampleProvider;
import java.util.Random.*;

class sensorTest{



	public static void kjorBand() {
		Motor.B.setSpeed(180);
		Motor.B.backward();
		Motor.A.setSpeed(320);
		Motor.A.backward();

	}
	public static boolean sjekkKnapp(float[] trykkSample, SampleProvider trykkSensor) {
		if (trykkSample != null && trykkSample.length > 0){
			trykkSensor.fetchSample(trykkSample, 0);
		 	if (trykkSample[0] > 0){
				return true;
			}
		}
		return false;
	}
	public static void kjorArm() throws Exception {
		//Sound.playSample(sang, 200);
		Motor.D.setSpeed(180);
		Motor.D.rotate(-180);
		Thread.sleep(1000);
		Motor.D.setSpeed(150);
		Motor.D.rotate(180);
	}

	public static void trillTerninger(float[] fargeSample, SampleProvider fargeLeser, SampleProvider trykksensor, float[] trykkSample) throws Exception{


		boolean trille = true;
		int poeng = 0;
		double farge = 0;
		while (trille) {
			java.util.Random generator = new java.util.Random();
			int tall = generator.nextInt(2);
			fargeLeser.fetchSample(fargeSample, 0);
			farge = fargeSample[0];

			/*if(farge == 7.0) {
				Thread.sleep(50);
				System.out.println("Svart"+ ", poeng: " + poeng);
				poeng--;
				poeng++;
				Thread.sleep(200);
			}
			*/

			if(farge == 3.0 || farge == 13.0){
				System.out.println("Gul"+ ", poeng: " + poeng);
				poeng += 2;
				Thread.sleep(200);
			}
			if (farge == 2.0) {

				if (tall == 1){
					System.out.println("Svart" + ", poeng: " + poeng);
					poeng++;
					Thread.sleep(200);
				}
				if(tall == 0){
					System.out.println("Blå"+ ", poeng: " + poeng);
					poeng += 3;
					Thread.sleep(200);
				}
			}

			if (farge == 6.0) {
				System.out.println("Hvit" + ", poeng: " + poeng);
				poeng += 4;
				Thread.sleep(200);
			}
			if (farge == 0.0) {
				System.out.println("Rød " + ", poeng: " + poeng);
				poeng += 5;
				Thread.sleep(200);
			}
			if(farge == 1.0) {
				System.out.println("Grønn " + ", poeng: " + poeng);
				poeng += 6;
				Thread.sleep(200);
			}
			//System.out.println(farge + " + " +  poeng);
			boolean knapp = sjekkKnapp(trykkSample,trykksensor);
			if (knapp) {
				kjorArm();
			}
		}
	}

	public static void main(String[] arg) throws Exception{

		Brick brick = BrickFinder.getDefault();
		Port s1 = brick.getPort("S1"); // Fargesensor
		Port s2 = brick.getPort("S2"); // Trykksensor

		EV3ColorSensor fargesensor = new EV3ColorSensor(s1); // EV3 fargesensor
		SampleProvider fargeLeser = fargesensor.getColorIDMode(); // Setter modus til RGB for fargesensoren
		float[] fargeSample = new float[fargeLeser.sampleSize()]; // Tabell med fargeverdier

		SampleProvider trykksensor = new EV3TouchSensor(s2); // Legger inn en trykksensor
		float[] trykkSample = new float[trykksensor.sampleSize()]; // Tabell for verdier til tryksensor




		kjorBand();
		boolean fortsett = true;
		while (fortsett) {
			trillTerninger(fargeSample,fargeLeser, trykksensor, trykkSample);
		}
	}
}
