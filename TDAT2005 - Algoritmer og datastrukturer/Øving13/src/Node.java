

class Node {
    private double[][] nodes;

    Node(int totalNodes) {
        nodes = new double[totalNodes][];
    }

    void addLocation(int node, double longitude, double latitude) {
        nodes[node] = new double[2];
        nodes[node][0] = longitude;
        nodes[node][1] = latitude;
    }

    double[] getLongLat(int node) {
        return nodes[node];
    }

    int calcHaversineDist(int node1, int node2) {
        double r = 6371000;
        double b1 = getLongLat(node1)[0] * (Math.PI / 180);
        double b2 = getLongLat(node2)[0] * (Math.PI / 180);
        double l1 = getLongLat(node1)[1] * (Math.PI / 180);
        double l2 = getLongLat(node2)[1] * (Math.PI / 180);
        return (int) Math.floor((2 * r) * Math.asin(Math.sqrt(Math.pow(Math.sin(((b1 - b2) / 2)), 2) + Math.cos(b1) * Math.cos((b2)) * Math.pow(Math.sin(((l1 - l2) / 2)), 2))));
    }
}