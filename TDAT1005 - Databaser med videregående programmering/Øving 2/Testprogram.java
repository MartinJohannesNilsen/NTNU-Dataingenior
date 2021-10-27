class Testprogram{
  public static void main(String[] args){
    Restaurant res = new Restaurant("MJN", 1999, 10);
    res.setRestaurantNavn("MN");
    if(res.getRestaurantNavn() == "MN"){System.out.println("Test 1 Vellykket");}
    if(res.getEtablering() == 1999){System.out.println("Test 2 Vellykket");}
    if(res.getRestaurantAlder() == 20){System.out.println("Test 3 Vellykket");}
    if(res.getAntLedigeBord() == 10){System.out.println("Test 4 Vellykket");}
    if(res.getAntOpptatteBord() == 0){System.out.println("Test 5 Vellykket");}
    if(res.reserverBord(2,"Mann")){System.out.println("Test 6 Vellykket");}
    int[] i = {0,1};
    int[] b = res.getBestemtReservasjon("Mann");
    if( b[0] == i[0] && b[1] == i[1]){System.out.println("Test 7 Vellykket");}else{System.out.println("Test 7 Ikke Vellykket");}
    if(res.frigiBord(i)){System.out.println("Test 8 Vellykket");}
  }
}
