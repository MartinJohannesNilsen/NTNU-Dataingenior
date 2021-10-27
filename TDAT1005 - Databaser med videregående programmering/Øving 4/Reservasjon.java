/**
 * Resevasjon.java
 *
 * Et objekt inneholder data om en reservasjon.
 * Operasjoner for å hente ut data, og for å sjekke om overlapp
 * med annen reservasjon.
 */

class Reservasjon {
  private final Tidspunkt fraTid;
  private final Tidspunkt tilTid;
  private final Kunde kunde;

  /**
   * Konstruktør:
   * fraTid må være før tilTid.
   * Ingen av argumentene kan være null.
   */
  public Reservasjon(Tidspunkt fraTid, Tidspunkt tilTid, Kunde kunde) {
    if (fraTid == null || tilTid == null) {
      throw new IllegalArgumentException("Fra-tid og/eller til-tid er null");
    }
    if (fraTid.compareTo(tilTid) >= 0) {
      throw new IllegalArgumentException("Fra-tid er lik eller etter til-tid");
    }
    if (kunde == null) {
      throw new IllegalArgumentException("Kunde er null");
    }
    this.fraTid = fraTid;
    this.tilTid = tilTid;
    this.kunde = kunde;
  }

  public Tidspunkt getFraTid() {
    return fraTid;
  }

  public Tidspunkt getTilTid() {
    return tilTid;
  }

  /**
   * Metoden returnerer true dersom tidsintervallet [sjekkFraTid, sjekkTilTid] overlapper
   * med det tidsintervallet som er i det reservasjonsobjektet vi er inne i [fraTid, tilTid].
   * Overlapp er ikke definert hvis sjekkFraTid eller sjekkTilTid er null.
   * Da kaster metoden NullPointerException.
   */
  public boolean overlapp(Tidspunkt sjekkFraTid, Tidspunkt sjekkTilTid) {
    return (sjekkTilTid.compareTo(fraTid) > 0 && sjekkFraTid.compareTo(tilTid) < 0);
  }

  public String toString() {
    return "Kunde: " + kunde.getNavn() + ", tlf: " + kunde.getTlf() + ", fra " +
                       fraTid.toString() + ", til " + tilTid.toString();
  }

  /**
   * Metode som prøver klassen Reservasjon.
   */
  public static void main(String[] args) {
    Kunde k = new Kunde("Anne Hansen", "12345678");
    System.out.println("Totalt antall tester: 2");
    Reservasjon r1 = new Reservasjon(new Tidspunkt(200302011000L), new Tidspunkt(200302011100L), k);
    Reservasjon r2 = new Reservasjon(new Tidspunkt(200301211000L), new Tidspunkt(200301211030L), k);
    Reservasjon r3 = new Reservasjon(new Tidspunkt(200302011130L), new Tidspunkt(200302011300L), k);
    Reservasjon r4 = new Reservasjon(new Tidspunkt(200302010900L), new Tidspunkt(200302011100L), k);
    if (r1.toString().equals("Kunde: Anne Hansen, tlf: 12345678, fra 01-02-2003 kl 1000, til 01-02-2003 kl 1100") &&
        r2.toString().equals("Kunde: Anne Hansen, tlf: 12345678, fra 21-01-2003 kl 1000, til 21-01-2003 kl 1030") &&
        r3.toString().equals("Kunde: Anne Hansen, tlf: 12345678, fra 01-02-2003 kl 1130, til 01-02-2003 kl 1300") &&
        r4.toString().equals("Kunde: Anne Hansen, tlf: 12345678, fra 01-02-2003 kl 0900, til 01-02-2003 kl 1100")) {
          System.out.println("Reservasjon: Test 1 vellykket.");
    }

    if (r1.overlapp(new Tidspunkt(200302011000L), new Tidspunkt(200302011100L)) &&
       !r1.overlapp(new Tidspunkt(200302021000L), new Tidspunkt(200302021100L)) &&
        r1.overlapp(new Tidspunkt(200302011030L), new Tidspunkt(200302011100L)) &&
        r1.overlapp(new Tidspunkt(200302010930L), new Tidspunkt(200302011030L))) {
         System.out.println("Reservasjon: Test 2 vellykket.");
    }
    // Flg. setning kaster exception (fra-tid lik til-tid)
    //Reservasjon r5 = new Reservasjon(new Tidspunkt(200302011100L), new Tidspunkt(200302011100L), k);
    // Flg. setning kaster exception (fra-tid > til-tid)
    //Reservasjon r5 = new Reservasjon(new Tidspunkt(200302011130L), new Tidspunkt(200302011100L), k);
  }
}
