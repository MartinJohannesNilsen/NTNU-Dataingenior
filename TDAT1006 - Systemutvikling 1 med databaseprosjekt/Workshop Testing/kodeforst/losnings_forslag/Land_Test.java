
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.*;

public class Land_Test{
	private static Land instance;

	@BeforeClass
	public static void setUpClass() throws Exception {
	}

	@AfterClass
	public static void tearDownClass() throws Exception {
	}

	@Before
	public void setUp()throws Exception {
		//legge inn kjent data i tabellene
		instance = new Land("Norge", "Kong Harald V", 4); // plass til kun en by
		instance.regBy(new By("By1", "Ordfører1, en", 10, 12));
		instance.regBy(new By("By2", "Ordfører2, to", 10, 100));
		instance.regBy(new By("By3", "Ordfører3, tre", 10, 200));
	}

	@After
	public void tearDown() {
	  // tilbakestill
	  instance = null;
    }
    /*Test av metoden getNavn() */
    @Test
    public void testGetNavn() throws Exception{
		System.out.println("testGetNavn");
		String expResult = "Norge";
		String result = instance.getNavn();
		assertEquals(expResult, result);
	}

  	/*Test av metoden getAntallInnbyggere() */
    @Test
    public void testGetAntallInnbyggere() throws Exception{
		System.out.println("testGetAntallInnbyggere");
		int expResult = 30;
		int result = instance.getAntallInnbyggere();
		assertEquals(expResult, result);
	}

    /*Test av metoden getStatsoverhode() */
    @Test
    public void testGtStatsoverhode() throws Exception{
		System.out.println("testGtStatsoverhode");
		String expResult = "Kong Harald V";
		String result = instance.getStatsoverhode();
		assertEquals(expResult, result);
	}


	/*Test av metoden setNavn() */
	@Test
	public void testSetNavn() throws Exception{
		System.out.println("testSetNavn");
		String expResult = "Selma";
		instance.setNavn(expResult);
		String result = instance.getNavn();
		assertEquals(expResult, result);
	}

	/*Test av metoden setStatsoverhode() */
	@Test
	public void testSetStatsoverhode() throws Exception{
		System.out.println("testSetStatsoverhode");
		String expResult = "Dronning Sonja";
		instance.setStatsoverhode(expResult);
		String result = instance.getStatsoverhode();
		assertEquals(expResult, result);
	}

	 /*Test av metoden toString() */
	    @Test
	    public void testToString() throws Exception{
			System.out.println("testToString");
			String expResult = "Norge, Statsoverhode: Kong Harald V\n Byer:\n---------------------\nBy1 Ordfører1, en 10 12\nBy2 Ordfører2, to 10 100\nBy3 Ordfører3, tre 10 200\n";
			String result = instance.toString();
			assertEquals(expResult, result);
	}

    /* Test av metoden getBy */
   @Test
   public void testGetBy() throws Exception{
	   System.out.println("testGetBy()");
	   By result = instance.getBy(0);
	   By expResult = new By("By1", "Ordfører1, en", 10, 12);
	   assertEquals(expResult, result);
   }

    /* Test av metoden getByerMedPlass */
    @Test
    public void testGetByerMedPlass() throws Exception{
		System.out.println("testGetByerMedPlass()");
		int antNyeInnbyggere = 80;
		By[] expResult = {new By("By2", "Ordfører2, to", 10, 100), new By("By3", "Ordfører3, tre", 10, 200)};
		By[] result = instance.getByerMedPlass(antNyeInnbyggere);
		assertArrayEquals(expResult, result);
	}

  /* Test av metoden getSortertOrdførerListe */
    @Test
    public void testGetSortertOrdførerListe() throws Exception{
		System.out.println("testGetSortertOrdførerListe()");
		String[]expResult = {"Ordfører1, en", "Ordfører2, to", "Ordfører3, tre"};
		String [] result = instance.getSortertOrdførerListe();
		assertArrayEquals(expResult, result);
	}

    /* Test av metoden Land.regBy - flere tester */
    @Test (expected=Exception.class)// kan ikke opprette en by med for mange innbyggere
    public void testregByForMangeInnbyggere() throws Exception{
		System.out.println("testregByForMangeInnbyggere()");
		// skal kaste unntak fordi byen har for mange innbyggere, unntaket kastes fra konstruktør i klassen By
		instance.regBy(new By("TulleBy", "Hansen, Hege", 100, 10));
    }

 	@Test // Normalsituasjon, reg en ok by
    public void testregByOk() throws Exception{
		System.out.println("testregByOk()");
		// registrere en by - normalsituasjon skal være ok
		boolean result = instance.regBy(new By("Trondheim", "Otervik, Rita", 170000, 200000));
		boolean expResult = true;
		assertEquals(expResult, result);
    }

    @Test // kan ikke opprette samme by to ganger
	    public void testregByDuplikat() throws Exception{
		System.out.println("testregByDuplikat()");
		// registrere en by - normalsituasjon skal være ok
		instance.regBy(new By("Trondheim", "Otervik, Rita", 170000, 200000));

		// registrere samme by to ganger - forventes å feile
		boolean result = instance.regBy(new By("Trondheim", "Otervik, Rita", 170000, 200000));
		boolean expResult = false;
		assertEquals(expResult, result);
    }

    @Test // kan ikke opprette flere byer enn det er plass til
	public void testregByIkkePlass() throws Exception{
		System.out.println("testregByIkkePlass()");
		// registrere en by - normalsituasjon skal være ok
		instance.regBy(new By("Trondheim", "Otervik, Rita", 170000, 200000));

		// registrere en by mer enn det er plass til, forventes å feile
		boolean result = instance.regBy(new By("Stjørdal", "Vigdenes, Ivar", 23308, 23400));
		boolean expResult = false;
		assertEquals(expResult, result);
	}


    public static void main(String args[]) {
	      org.junit.runner.JUnitCore.main(Land_Test.class.getName()); // tas med dersom textpad ikke er konfigurert
    }
}