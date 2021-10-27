import java.io.*;
import java.net.*;

class SocketTjener extends Thread {
    private DatagramSocket socket;
    final int PORTNR = 1250;
    private byte[] buf = new byte[256];
    private byte[] sendBuf = new byte[256];

    public SocketTjener() throws SocketException {
        socket = new DatagramSocket(PORTNR);
    }

    public void run() {
        try {
            boolean ferdig = false;
            while (!ferdig) {
                DatagramPacket packet = new DatagramPacket(buf, buf.length);
                socket.receive(packet);

                InetAddress address = packet.getAddress();
                int port = packet.getPort();
                packet = new DatagramPacket(buf, buf.length, address, port);
                String received = new String(packet.getData(), 0, packet.getLength());
                if(received.equals("end")) {
                    ferdig = true;
                    continue;
                }
                String result = "";
                String[] fjernEkstraBytes = received.trim().split(";");
                String[] array = fjernEkstraBytes[0].split(":");
                double tall1 = Double.parseDouble(array[0]);
                double tall2 = Double.parseDouble(array[2]);
                if(array[1].equals("1")){
                    result += "+:";
                    double ans = tall1+tall2;
                    result += ans;
                }else if(array[1].equals("2")){
                    result += "-:";
                    double ans = tall1-tall2;
                    result += ans;
                } else if(array[1].equals("3")){
                    result += "*:";
                    double ans = tall1*tall2;
                    result += ans;
                } else if(array[1].equals("4")){
                    result += "/:";
                    double ans = tall1/tall2;
                    result += ans;
                }
                System.out.println(result);
                sendBuf = result.getBytes();
                packet = new DatagramPacket(sendBuf, sendBuf.length, address, port);
                socket.send(packet);
            }
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws Exception{
        new SocketTjener().start();
    }
}
