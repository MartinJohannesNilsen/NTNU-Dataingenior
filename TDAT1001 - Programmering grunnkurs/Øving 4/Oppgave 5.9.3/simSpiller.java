import java.util.Random;

public class simSpiller{
	java.util.Random terning = new java.util.Random();
	int sumPoeng;
	
	public simSpiller(int sumPoeng){
		this.sumPoeng = sumPoeng;
	}
	
	public int getSum(){
		return sumPoeng;
	}
	
	public int terningKast(){
		int terningKast = terning.nextInt(6)+1;
		if(terningKast==1){
			sumPoeng = 0;
			return terningKast;
		}else{
		sumPoeng = sumPoeng + terningKast;
		return terningKast;
		}
	}
}