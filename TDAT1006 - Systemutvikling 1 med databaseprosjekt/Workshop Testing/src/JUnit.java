import org.junit.*;
import org.junit.Test;
import static org.junit.Assert.*;
public class JUnit{
    private static Land instance;
    private static By instanceBy1;
    private static By instanceBy2;

    @BeforeClass
    public static void setUpClass() throws Exception {
        //noe
    }
    @AfterClass
    public static void tearDownClass() throws Exception {
        //noe
    }
    @Before
    public void setUp()throws Exception {
        instance = new Land("Norge", "Erna Solberg", 10);
        instanceBy1 = new By("Atlantis", "Jonas", 1, 2);
        instanceBy2 = new By("Zootropolis", "Max", 5, 8000)
    }
    @After
    public void tearDown() {
        instance = null;
    }
    /* Test av metoden EnKlasse.testmetode() */
    @Test
    public void testGetNavn() throws Exception{
        assertTrue(instance.getNavn().equals("Norge"));
    }

    @Test
    public void testStatsoverhode() throws Exception{
        assertTrue(instance.getStatsoverhode().equals("Erna Solberg"));
    }

    @Test
    public void testGetAntInnbyggere() throws Exception{
        instance.regBy(new By("Atlantis", "Jonas", 1, 2));
        assertEquals(instance.getAntallInnbyggere(), 1);
    }

    @Test
    public void testRegBy() throws Exception{
        Boolean metode = instance.regBy(new By("Atlantis", "Jonas", 1, 2));
        Boolean fungerer = true;
        assertEquals(metode, fungerer);
    }

    @Test
    public void testGetOrdførere() throws Exception{
        instance.regBy(new By("Atlantis", "Jonas", 1, 2));
        assertEquals(instance.getOrdførere()[0], "Jonas");
    }

    @Test
    public void testgetSortertOrdførerListe() throws Exception{
        instance.regBy(new By("Atlantis", "Jonas", 1, 2));
        assertEquals(instance.getSortertOrdførerListe()[0], "Jonas");
    }

    @Test
    public void testgetByerMedPlass() throws Exception{
        instance.regBy(new By("Atlantis", "Jonas", 1, 2));

        assertEquals(instance.getByerMedPlass(1)[0].getNavn(), "Atlantis");
    }






}
