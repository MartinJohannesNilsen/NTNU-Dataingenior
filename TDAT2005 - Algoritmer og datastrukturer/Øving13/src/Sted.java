

import java.util.HashMap;
import java.util.Map;

class Sted {
    private Map<Integer, String> places = new HashMap<>();

    void addPlace(int node, String navn) {
        places.put(node, navn);
    }

    int getNode(String navn) {
        for (Map.Entry<Integer, String> entry : places.entrySet()) {
            if (navn.equals(entry.getValue())) {
                return entry.getKey();
            }
        }
        return -1;
    }

    String getName(int node) {
        return places.get(node);
    }
}