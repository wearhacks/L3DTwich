import processing.net.*;

int port = 3001;
Server myServer;
Client myClient;

void setup() {
  myServer = new Server(this, port);
}

void draw() {
  if (myServer.available() != null) {
    println(myServer.available().readString()); 
  }
}

void serverEvent(Server server, Client client) {
  println("We have a new client: " + client.ip());
}