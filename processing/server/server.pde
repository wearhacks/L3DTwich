import processing.net.*;
import L3D.*;

int port = 3001;
Server myServer;
Client myClient;

L3D cube;

void setup() {
  size(512, 512, P3D); // start simulation with 3d renderer
  // Setup server
  myServer = new Server(this, port);
  
  // Setup cube
  cube = new L3D(this); // init
  //cube.enableMulticastStreaming(2000); // enable streaming of voxel colors over port 2000
}

void draw() {
  background(0); // set background to black
  lights(); // turn on light
  
  // If something was received by the server, read and parse it
  if (myServer.available() != null) {
    String message = myServer.available().readString();
    if (message.length() == 17) {
      int[][] data = parseData(message);
      displayVoxel(data);
    } else {
      println(message);
    }
  }
}

void serverEvent(Server server, Client client) {
  println("We have a new client: " + client.ip());
}

int[][] parseData(String message) {
  int[][] data = new int[2][3];

  String[] splitedMessage = split(message, ":");
  println("New point parsed: " + splitedMessage[0]);
  data[0] = int(split(splitedMessage[0], ","));
  data[1] = int(split(splitedMessage[1], ","));

  return data;
}

void displayVoxel(int[][] dataPoint) {
  cube.setVoxel(dataPoint[0][0], dataPoint[0][1], dataPoint[0][2], color(dataPoint[1][0], dataPoint[1][1], dataPoint[1][2]));
}