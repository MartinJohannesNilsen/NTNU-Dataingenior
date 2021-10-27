import javax.persistence.*;
import java.util.*;

public class KontoDAO {
    private EntityManagerFactory entityManageFactory;

    private EntityManager getEntityManager() {return entityManageFactory.createEntityManager();}
    private void lukkEntityManager(EntityManager entityManager) {
        if (entityManager.isOpen() && entityManager != null) {entityManager.close();}
    }
    public KontoDAO(EntityManagerFactory entityManageFactory) {this.entityManageFactory = entityManageFactory;}

    //Oppretter konto
    public void opprettKonto(Konto konto) {
        EntityManager entityManager = getEntityManager();
        try {
            entityManager.getTransaction().begin();
            entityManager.persist(konto);
            entityManager.getTransaction().commit();
        } finally {
            lukkEntityManager(entityManager);
        }
    }

    //Finner konto basert på kontonr
    public Konto finnKonto(int kontonr) {
        EntityManager entityManager = getEntityManager();
        try {
            return entityManager.find(Konto.class, kontonr);
        } finally {
            lukkEntityManager(entityManager);
        }
    }

    //Endrer konto i db
    public void endreKonto(Konto konto) {
        EntityManager entityManager = getEntityManager();
        try {
            entityManager.getTransaction().begin();
            Konto midlertidigKonto = konto;
            entityManager.merge(midlertidigKonto);
            entityManager.getTransaction().commit();
        } finally {
            lukkEntityManager(entityManager);
        }
    }

    //Henter ut alle kontoene fra db
    public List<Konto> getAlleKontoer() {
        EntityManager entityManager = getEntityManager();
        try {
            Query query = entityManager.createQuery("SELECT OBJECT (konto) FROM Konto konto");
            return query.getResultList();
        } finally {
            lukkEntityManager(entityManager);
        }
    }

    //Finn konto med saldo over et gitt beløp
    public List<Konto> getKontoMedMinimumSaldo(double beløp) {
        EntityManager entityManager = getEntityManager();
        try {
            Query query = entityManager.createQuery("SELECT OBJECT (konto) FROM Konto konto WHERE konto.saldo > :beløp");
            query.setParameter("beløp", beløp);
            return query.getResultList();
        } finally {
            lukkEntityManager(entityManager);

        }
    }

    //Trekker et beløp fra gitt konto
    private void trekkPenger(double beløp, Konto konto){
        EntityManager entityManager = getEntityManager();
        try {
            entityManager.getTransaction().begin();
            Konto midlertidigKonto = konto;
            midlertidigKonto.trekk(beløp);
            entityManager.merge(midlertidigKonto);
            entityManager.getTransaction().commit();
        }finally {
            lukkEntityManager(entityManager);
        }
    }

    //Setter inn penger på gitt konto
    public void settInnPenger(double beløp, Konto konto){
        EntityManager entityManager = getEntityManager();
        try {
            entityManager.getTransaction().begin();
            Konto midlertidigKonto = konto;
            midlertidigKonto.settInnPenger(beløp);
            entityManager.merge(midlertidigKonto);
            entityManager.getTransaction().commit();
        }finally {
            lukkEntityManager(entityManager);
        }
    }

    public void overførPenger(double beløp, int fraKontonummer, int tilKontonummer){
        EntityManager entityManager = getEntityManager();
        boolean overført = false;

        while (!overført)
            try {
                Konto fraKonto = entityManager.find(Konto.class, fraKontonummer);
                Konto tilKonto = entityManager.find(Konto.class, tilKontonummer);

                entityManager.getTransaction().begin();
                trekkPenger(beløp, fraKonto);
                settInnPenger(beløp, tilKonto);

                overført = true;
                entityManager.merge(fraKonto);
                entityManager.merge(tilKonto);

                //System.out.println("Denne metoden kan fremprovosere feil");
                //entityManager.getTransaction().commit();
            }catch (OptimisticLockException e){
                e.printStackTrace();
            }finally {
                lukkEntityManager(entityManager);
            }
    }
}
