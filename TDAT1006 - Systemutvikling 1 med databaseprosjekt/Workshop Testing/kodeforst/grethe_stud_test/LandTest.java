import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.*;
import org.junit.platform.launcher.*;


class LandTest{
  private Land instance;

    @BeforeEach
    void setUp() {
        instance = new Land("Mitt lille land", "grethe", 5);
    }

    @BeforeEach
    void tearDown() {
    }

    @Test
    void getNavn() {
        System.out.println("Test: getNavn()");
        String expResult = "Mitt lille land";
        String result = instance.getNavn();
        assertEquals(result, expResult);
    }

    @Test
    void setNavn() {
    }

    @Test
    void getStatsoverhode() {
    }

    @Test
    void setStatsoverhode() {
    }

    @Test
    void toStringTest() {
    }

    @Test
    void regBy() {
    }
    @Test
    void getAntallInnbyggere() {
    }

    @Test
    void getByerMedPlass() {
    }

    @Test
    void getSortertOrdførerListe() {
    }

    @Test
    void getBy() {
    }


 public void runOne() {
        LauncherDiscoveryRequest request = LauncherDiscoveryRequestBuilder.request()
          .selectors(selectClass(LandTest.class))
          .build();
        Launcher launcher = LauncherFactory.create();
        TestPlan testPlan = launcher.discover(request);
        launcher.registerTestExecutionListeners(listener);
        launcher.execute(request);
    }

    public static void main(String args[]) {
		LauncherDiscoveryRequest request = LauncherDiscoveryRequestBuilder.request().selectors(selectClass(LandTest.class)).build();
        Launcher launcher = LauncherFactory.create();
        TestPlan testPlan = launcher.discover(request);
        launcher.registerTestExecutionListeners(listener);
        launcher.execute(request);
	    System.out.pritln(listener.getSummary());
    }
}