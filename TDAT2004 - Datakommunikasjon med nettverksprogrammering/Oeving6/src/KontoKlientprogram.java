import org.eclipse.persistence.internal.oxm.schema.model.All;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

public class KontoKlientprogram {
    public static void main(String args[]) throws NullPointerException {
        EntityManagerFactory entityManagerFactory = null;
        KontoDAO kontoDAO = null;
        try {
            entityManagerFactory = Persistence.createEntityManagerFactory("persistanceUnit");
            kontoDAO = new KontoDAO((entityManagerFactory));

            /*
            * Oppgave 2 går ut på:
             * å lage kontoer og legge de inn i db
             * å finne kontoer over en viss saldo
             * å endre på en eier
            */
            //Oppretter noen kontoer
            Konto konto1 = new Konto(1,7,"Martin");
            Konto konto2 = new Konto(2, 30000, "Ellen");
            Konto konto3 = new Konto(3, 4500, "Lea");
            kontoDAO.opprettKonto(konto1);
            kontoDAO.opprettKonto(konto2);
            kontoDAO.opprettKonto(konto3);
            System.out.println("\n--------------------\nVelkommen til Martins bank!\n--------------------");

            //Skriver ut alle kontoene fra db
            System.out.println("Følgende kontoer ligger i db:\n");
            List<Konto> liste = kontoDAO.getAlleKontoer();
            for (Konto k : liste) {
                System.out.println("> " + k + "\n");
            }
            System.out.println("-------------");

            //lister ut alle kontoer med saldo større enn gitt beløp
            int beløp = 1000;
            liste = kontoDAO.getKontoMedMinimumSaldo(beløp);
            System.out.println("Følgenede har mer enn " + beløp + "kr på kontoen: \n");
            for (Konto k : liste) {
                System.out.println("> " + k + "\n");
            }
            System.out.println("-------------");

            //Endrer på eier
            Konto konto = (Konto) liste.get(1);
            System.out.println("Endrer eieren på konto #" + konto.getKontonr() + " til Simon...");
            konto.setEier("Simon");
            kontoDAO.endreKonto(konto);
            konto = kontoDAO.finnKonto(konto.getKontonr());
            System.out.println("Eier er nå endret til " + konto.getEier() + "\n");
            System.out.println("-------------");

            //Sjekker at ny eier er blitt satt i db ved å skrive ut kontoer på nytt
            System.out.println("Ny status over kontoer: \n");
            liste = kontoDAO.getAlleKontoer();
            for (Konto k : liste) {
                System.out.println("> " + k + "\n");
            }
            System.out.println("-------------");

            /*
            *Oppgave 3 var å overføre penger mellom to kontoer uten lås og se at man kunne få feil.
            * Etter jeg hadde gjort dette implementerte jeg optimalLås i klassene og db for å sikre at man manipulerer dataen riktig.
            */

            /*
            * Oppgave 4.
            * Her skulle jeg implementere optimistisk låsing for å unngå at man kan overkjøre andres endringer i databasen dersom det er flere klienter på samtidig.
            */
            double belop = 500;
            int fraKontonummer = 2;
            int tilKontonummer = 1;
            kontoDAO.overførPenger(belop,fraKontonummer,tilKontonummer);
            konto1 = kontoDAO.finnKonto(fraKontonummer);
            konto2 = kontoDAO.finnKonto(tilKontonummer);
            System.out.println("Transaksjon #43293681\nOverfører " + belop + "kr\n" +
                    "> Fra konto #" + konto1.getKontonr() + ", " + konto1.getEier() + "\n" +
                    "> Til konto #" + konto2.getKontonr() + ", " + konto2.getEier());
            liste = kontoDAO.getAlleKontoer();
            System.out.println("\n-------------");
            System.out.println("Ny kontostatus:");
            for (Konto k : liste) {
                System.out.println("> " + k + "\n");
            }

        } catch (Exception e){
            e.printStackTrace();
        } finally {
            entityManagerFactory.close();
        }
    }
}