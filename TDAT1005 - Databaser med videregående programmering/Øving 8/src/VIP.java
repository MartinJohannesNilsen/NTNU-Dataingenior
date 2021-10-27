

class VIP extends Sitte {
    private String[][] tilskuer; // tabellstørrelse: antall rader * antall plasser pr rad

    public VIP(String tribunenavn, int kapasitet, int pris, int[] antOpptatt, String[][] tilskuer){
        super(tribunenavn,kapasitet, pris, antOpptatt);
        this.tilskuer = tilskuer;
    }

    public String[][] getTilskuer(){return tilskuer;}

    public int finnAntallSolgteBilletter(){
        int antSolgteBilletter = 0;
        for(int i = 0; i<tilskuer.length; i++){
            for(int j = 0; j<tilskuer[0].length; j++){
                if(tilskuer[i][j] != null){
                    antSolgteBilletter++;
                }
            }
        }
        return antSolgteBilletter;
    }

    public Billett[] kjøpBilletter(int antBilletter){
        System.out.println("Du kan ikke kjøpe VIP-Billetter uten navn!");
        return null;
    }

    public Billett[] kjøpBilletter(String[] kjøpere){
        for(int i = 0; i<kjøpere.length;i++){
            if(kjøpere[i] == null){throw new IllegalArgumentException("Kjøpertabellen er ikke riktig utfylt");}
        }
        Billett[] stringBilletter = new Billett[kjøpere.length];
        int kapasitetPrRad = getKapasitet()/getAntOpptatt().length;
        int radMedPlass = -1;
        int[] radOversikt = getAntOpptatt();
        boolean avslutt = false;
        while(!avslutt){ //finne rad med plass først
            for(int i = 0; i<radOversikt.length; i++){
                if(radOversikt[i]+kjøpere.length <= kapasitetPrRad){
                    radMedPlass=i;
                    avslutt = true;
                    break;
                }
            }
            if(radMedPlass==-1){
                System.out.println("Det er ingen plass");
                return stringBilletter;
            }
        }
        //System.out.println(radMedPlass);
        for(int i = 0; i<stringBilletter.length; i++){ //registrerer billetter
            stringBilletter[i] = new SitteplassBillett(getTribunenavn(), getPris(), radMedPlass, radOversikt[radMedPlass]+i);
            tilskuer[radMedPlass][radOversikt[radMedPlass]+i] = kjøpere[i];
        }
        return stringBilletter;
    }


}



