import java.io.*;
import java.util.*;
class TransaksjonsOperasjoner{
	private double saldo;
	
	public TransaksjonsOperasjoner(double saldo){
		this.saldo = saldo;
	}
	
	public String utførUttak(double uttak){
		this.saldo -= uttak;
		return "U " + uttak;
	}
	
	public String utførInnskudd(double innskudd){
		this.saldo += innskudd;
		return "I " + innskudd;
	}
	
	public double getSaldo(){
		return saldo;
	}
	
	
	
	
}


