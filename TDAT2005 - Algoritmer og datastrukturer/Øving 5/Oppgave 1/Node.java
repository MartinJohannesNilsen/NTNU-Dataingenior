class Node {
    private String navn;
    private Node neste;
    public Node(String a, Node neste){
        navn = a;
        neste = neste;
    }

    public Node finnNeste(){return neste;}
    public String finnNavn(){return navn;}

    public void settNeste(Node neste){
        this.neste = neste;
    }
}