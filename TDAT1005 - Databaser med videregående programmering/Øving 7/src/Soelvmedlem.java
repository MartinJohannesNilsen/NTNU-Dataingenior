import java.time.LocalDate;

class Soelvmedlem extends Bonusmedlem{
    private int poeng = 0;

    public Soelvmedlem(int medlNr, Personalia pers, LocalDate innmeldDato, int poeng){
        super(medlNr, pers, innmeldDato);
        this.poeng = poeng;
    }

    @Override
    public int getPoeng(){return this.poeng;}

    @Override
    public boolean registrerPoeng(int nyePoeng) {
        if (nyePoeng <= 0) return false;
        this.poeng += nyePoeng * 1.2;
        return true;
    }


}