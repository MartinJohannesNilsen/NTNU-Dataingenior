/**
 * Tidspunkt.java
 *
 * Klasse som håndterer tidspunkt gitt som et heltall av typen long.
 *
 * NB! Konstruktøren foretar ingen kontroll av om tidspunktet er gyldig!
 */

class Tidspunkt implements Comparable<Tidspunkt> {
  private final long tid; // format ååååmmddttmm

  public Tidspunkt(long tid) {
    this.tid = tid;
  }

  public long getTidspunkt() {
    return tid;
  }

  /**
   * Formaterer tidspunktet slik: dd-mm-åååå kl ttmm
   */
  public String toString() {
    /*
     * Foretar trygg omforming til mindre type,
     * dato og klokkeslett er hver for seg innenfor tallområdet til int.
      */
    int dato = (int) (tid / 10000);
    int klokkeslett = (int) (tid % 10000);
    int år = dato / 10000;
    int mndDag = dato % 10000;
    int mnd = mndDag / 100;
    int dag = mndDag % 100;

    String tid = "";
    if (dag < 10) {
      tid += "0";
    }
    tid += dag + "-";
    if (mnd < 10) {
      tid += "0";
    }
    tid += mnd + "-" + år + " kl ";
    if (klokkeslett < 1000) {
      tid += "0";
    }
    tid += klokkeslett;
    return tid;
  }

  public int compareTo(Tidspunkt detAndre) {
    if (tid < detAndre.tid) {
      return -1;
    } else if (tid > detAndre.tid) {
      return 1;
    } else {
      return 0;
    }
  }

  /* Tester klassen Tidspunkt */
  public static void main(String[] args) {
    System.out.println("Totalt antall tester: 2");
    Tidspunkt t1 = new Tidspunkt(200301201200L);
    Tidspunkt t2 = new Tidspunkt(200301070230L);
    Tidspunkt t3 = new Tidspunkt(200301070230L);
    if (t1.compareTo(t2) > 0 &&
        t2.compareTo(t1) < 0 &&
        t3.compareTo(t2) == 0 &&
        t2.compareTo(t3) == 0) {
          System.out.println("Tidspunkt: Test 1 vellykket.");
    }
    if (t1.toString().equals("20-01-2003 kl 1200") &&
        t2.toString().equals("07-01-2003 kl 0230") &&
        t3.toString().equals("07-01-2003 kl 0230")) {
          System.out.println("Tidspunkt: Test 2 vellykket.");
    }
  }
}
