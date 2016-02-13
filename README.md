# L3DTwitch
This project aims at controlling the [L3DCube](http://www.cubetube.org/) remotely while streaming the result via [Twitch](http://www.twitch.tv/). 

Messages from the IRC Twitch channel of the live stream are parsed on NodeJS. When a coordinates/color pair is recognized NodeJS sends it to a [Processing](https://processing.org/) server that uses the [L3DCube library](https://github.com/enjrolas/L3D-Library) to send the proper instruction to the cube over a UDP socket. 

The following format is recognized as proper value pairs (whitespaces don't matter): 
- (x, y, z)(r, g, b)
- (x, y, z)#hexcolorcode

Additionnally NodeJS runs a small server in order to provide an API so that instructions can be sent from a simple webpage. An example is given in the **example** folder. *index.html* provides a simple implementation of an embedded Twitch live stream with its IRC channel, as well as a simple system to chose a color from a palette, select the coordinates and send the command to the server. You will need to modify the host and port parameters in the javascript portion of the html file to match your own setup. 

## Usage
First off you will need a proper twitch account so that you can use your username and oauth key for the steps below. Your google-fu should help you with this step. 

Next:

1. Clone the repository on the server that will run NodeJS. Repeat the operation with the local machine that will run Processing. You could use one machine for both tasks but if you expect a lot of messages to parse from Twitch you might as well run node elsewhere since your computer will already be live-streaming and running Processing. 
2. On the instance that runs Node, navigate to the **node** subfolder: `cd node`
3. Install the dependencies: `npm install`
4. Edit the **config.js** file to add your twitch account details: *username*, *password* and *channels*. 
5. Run the Node script: `node main.js`
6. On a computer connected to the same local network as the cube, run the Processing sketch **server.pde** located in the **processing/server** subfolder. 

## Details
![schematic](https://github.com/wearhacks/L3DTwitch/blob/master/functional_schematic.png "Functional Schematic")
