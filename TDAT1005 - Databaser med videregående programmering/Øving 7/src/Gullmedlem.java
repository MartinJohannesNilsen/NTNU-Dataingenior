import java.time.LocalDate;

class Gullmedlem extends Bonusmedlem{
    private int poeng = 0;

    public Gullmedlem(int medlNr, Personalia pers, LocalDate innmeldDato, int poeng){
        super(medlNr, pers, innmeldDato);
        this.poeng = poeng;
    }

    @Override
    public int getPoeng(){return this.poeng;}

    @Override
    public boolean registrerPoeng(int nyePoeng) {
        if (nyePoeng <= 0) return false;
        this.poeng += nyePoeng * 1.5;
        return true;
    }
}