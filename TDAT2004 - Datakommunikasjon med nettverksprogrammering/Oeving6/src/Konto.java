import java.io.*;
import javax.persistence.*;

@Entity
public class Konto implements Serializable {
    @Id
    @Column(name = "kontonr")
    private int kontonr;

    @Version
    @Column(name = "optimistiskLås")
    private int lås;

    private double saldo;
    private String eier;

    public Konto(int kontonr, double saldo, String eier) {
        this.kontonr = kontonr;
        this.saldo = saldo;
        this.eier = eier;
        this.lås = 0;
    }

    //Intellij ville absolutt ha denne metoden
    public Konto() {
    }

    public int getKontonr() {return kontonr;}
    public double getSaldo() {return saldo;}
    public String getEier() {return eier;}
    public int getLås() {return lås;}

    public void setSaldo(double saldo) {this.saldo = saldo;}
    public void setEier(String eier) {this.eier = eier;}
    public void setLås(int lås) {this.lås = lås;}

    //Oppgave 2 ønsker en metode trekk som skal trekke et visst beløp fra konto
    public void trekk(double beløp){
        double res = getSaldo() - beløp;
        setSaldo(res);
    }

    //Oppgave 3 og 4 skal overføre penger, trenger derfor en metode for å sette inn penger
    public void settInnPenger(double beløp){
        double res = getSaldo() + beløp;
        setSaldo(res);
    }

    public String toString() {
        return "Konto #"+ kontonr + ":\nNavn på eier: " + eier + "\nSaldo: " + saldo;
    }
}