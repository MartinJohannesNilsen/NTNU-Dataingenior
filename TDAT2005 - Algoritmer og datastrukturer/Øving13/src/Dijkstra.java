

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

class Dijkstra {

    int[] naviger(int fra, int til, Tilkobling[] nodes, String fraSted, String tilSted) {
        long start = System.currentTimeMillis();

        int[] lengde = new int[nodes.length];
        int[] komFra = new int[nodes.length];

        lengdeFraStart comparator = new lengdeFraStart(lengde);
        PriorityQueue<Integer> queue = new PriorityQueue<>(nodes.length, comparator);

        for (int i = 0; i < nodes.length; i++) {
            lengde[i] = 10000000;
            komFra[i] = 10000000;
        }

        lengde[fra] = 0;
        komFra[fra] = -2;

        queue.add(fra);

        int nodeIndex;
        int totLengde;
        int totAntNoder = 0;
        int getConnection;
        Tilkobling connection;

        while (!queue.isEmpty()) {

            nodeIndex = queue.poll();

            if (nodeIndex == til) break;

            connection = nodes[nodeIndex];
            totAntNoder++;

            while (connection != null) {

                totLengde = lengde[nodeIndex] + connection.getLength();
                getConnection = connection.getConnection();

                if (totLengde < lengde[getConnection]) {
                    lengde[getConnection] = totLengde;
                    komFra[getConnection] = nodeIndex;

                    if (til == getConnection) queue.remove(getConnection);
                    queue.add(getConnection);
                }

                connection = connection.getNextConnection();
            }
        }

        int traceBackNode = til;
        List<Integer> noderPassert = new ArrayList<>();
        noderPassert.add(0, til);

        while (komFra[traceBackNode] != -2) {
            noderPassert.add(0, traceBackNode);
            traceBackNode = komFra[traceBackNode];
        }

        long totTid = System.currentTimeMillis() - start;

        GPS.info("Dijkstra", totAntNoder, noderPassert.size() - 1, lengde[til], totTid, fraSted, tilSted);

        return noderPassert.stream().mapToInt(i -> i).toArray();
    }
}