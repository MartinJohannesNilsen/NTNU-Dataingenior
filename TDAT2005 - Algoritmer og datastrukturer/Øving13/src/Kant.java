

class Kant {
    Tilkobling[] nodes;

    Kant(int size) {
        nodes = new Tilkobling[size];
    }

    void addNode(int index, int connection, int weight) {
        if (nodes[index] == null) nodes[index] = new Tilkobling(connection, weight);
        else nodes[index].addConnection(connection, weight);
    }
}