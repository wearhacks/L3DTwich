import processing.net.*;

int port = 3001;
Server myServer;

void setup() {
  myServer = new Server(this, port);
}

void draw() {

}

void serverEvent(Server server, Client client) {
  println("We have a new client: " + client.ip());
  
  if (client.available() > 0) {
    String received = client.readString();
    println(received);
  }
}