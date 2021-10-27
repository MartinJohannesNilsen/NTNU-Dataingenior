package dyrehage;

interface SkandinaviskeRovdyr{
    String getNavn();
    int getFdato();
    int getAlder();
    String getAdresse();
    void flytt(String nyAdresse);
    String skrivUtInfo();
    int getAntKull();
    void leggTilKull(int antall);
    void leggTilNyttKull();
}
