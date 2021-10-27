

import java.util.Comparator;

class Tilkobling {
    private int connection;
    private int length;
    private Tilkobling nextConnection;

    Tilkobling(int connection, int length) {
        this.connection = connection;
        this.length = length;
    }

    int getConnection() {
        return connection;
    }

    Tilkobling getNextConnection() {
        return nextConnection;
    }

    public int getLength() {
        return length;
    }

    void addConnection(int connection, int weight) {
        if (nextConnection == null) nextConnection = new Tilkobling(connection, weight);
        else nextConnection.addConnection(connection, weight);
    }
}

class lengdeFraStart implements Comparator<Integer> {
    private int[] lengthFromSource;

    lengdeFraStart(int[] lengthFromSource) {
        this.lengthFromSource = lengthFromSource;
    }

    public int compare(Integer node1, Integer node2) {
        return lengthFromSource[node1] - lengthFromSource[node2];
    }
}

class lengdeMellomNode implements Comparator<Integer> {
    private int[] lengthFromSource;
    private int[] distanceTo;

    lengdeMellomNode(int[] distanceTo, int[] lengthFromSource) {
        this.distanceTo = distanceTo;
        this.lengthFromSource = lengthFromSource;
    }

    public int compare(Integer node1, Integer node2) {
        return distanceTo[node1] + lengthFromSource[node1] - distanceTo[node2] - lengthFromSource[node2];
    }
}