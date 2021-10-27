"use strict";

const net = require("net");
const crypto = require("crypto");

const generateAcceptValue = acceptKey =>
  crypto
    .createHash("sha1")
    .update(acceptKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11", "binary")
    .digest("base64");

//Http server serving clients the frontend-part of the application
const httpServer = net.createServer(connection => {
  connection.on("data", () => {
    let content = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
      </head>
      <script>
        let ws = new WebSocket('ws://localhost:3001');
        
        ws.onmessage = event => document.getElementById("chatBox").innerHTML = document.getElementById("chatBox").innerHTML + event.data + "</br>";
        
        const onSend = () => {
          let input = document.getElementById("melding").value;
          let navn = document.getElementById("navn").value;
          if(input.trim() != "" && navn.trim() != ""){
            let ferdigMelding = navn + ": " + input;
            ws.send(ferdigMelding);
            document.getElementById("chatBox").innerHTML = document.getElementById("chatBox").innerHTML + document.getElementById("navn").value + ": " + input + "<br/>";
            document.getElementById("melding").value = "";
          }
        }

        document.addEventListener('keypress', (e) => {
          if(e.key === 'Enter') return onSend();
        });

      </script>
      <style>
        body{
          text-align: center;
          background-color: white;
        }

        .form{
          text-align: left;
          margin: auto;
          width: 500px;
        }
      
        .chatBox{
          border: 1px solid black;
          width: 500px;
          height: 700px;
          overflow-x: auto;
          margin: 20px auto;
          text-align: left;
          padding: 10px 0 10px 20px;
        }
      </style>
      <body>
        <div class="container">
          <div>
            <h1>Martins messenger</h1>
          </div>
          <div class="form">
            <label for="navn">Navn: </label><br/>
            <input type="text" id="navn" name="navn" placeholder="Brukernavn..."/>
            <br/>
            <label for="navn">Melding: </label><br/>
            <textarea type="text" id="melding" name="melding" placeholder="Melding..." rows="4" cols="50"></textarea>
            <input type="submit" value="Send" onclick="return onSend();"/>
          </div>
          <div id="chatBox" class="chatBox">
          </div>
        </div>
      </body>
    </html>
    `;
    connection.write("HTTP/1.1 200 OK\r\nContent-Length: " + content.length + "\r\n\r\n" + content);
  });
});
httpServer.listen(3000, () => {
  console.log("HTTP server listening on port 3000");
});

//Websocket Server
let clients = [];
const wsServer = net.createServer(connection => {
  console.log("Client connected");

  //When the server receives data
  connection.on("data", data => {
    if (data.toString()[0] == "G") { //If its a Get-request
      var key = data.toString().substring(data.toString().indexOf("-Key: ") + 6,data.toString().indexOf("==") + 2);
      var acceptValue = generateAcceptValue(key);
      const responseHeaders = [
        "HTTP/1.1 101 Web Socket Protocol Handshake",
        "Upgrade: websocket",
        "Connection: Upgrade",
        "Sec-WebSocket-Accept:" + acceptValue
      ];
      connection.write(responseHeaders.join("\r\n") + "\r\n\r\n");
      clients.push(connection);
    } else { //else its a message
      let melding = "";
      let length = data[1] & 127;
      let maskStart = 2;
      let dataStart = maskStart + 4;
      for (let i = dataStart; i < dataStart + length; i++) {
        let byte = data[i] ^ data[maskStart + ((i - dataStart) % 4)];
        melding += String.fromCharCode(byte);
      }
      sendToClients(melding, connection);
    }
  });

  //When a client disconnects
  connection.on("end", () => {
    console.log("Client disconnected");
  });
});

const sendToClients = (melding, c) => {
  let buffer = Buffer.concat([
    new Buffer.from([
      0x81,
      "0x" +
        (melding.length + 0x10000)
          .toString(16)
          .substr(-2)
          .toUpperCase()
    ]),
    Buffer.from(melding)
  ]);
  clients.forEach(client => {
    if (c != client) client.write(buffer);
  });
};

wsServer.on("error", error => {
  console.error("Error: ", error);
});
wsServer.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});