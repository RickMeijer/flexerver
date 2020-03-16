const WebSocket = require("ws");
const wss = new WebSocket.Server({
  port: 5000
});
console.info("listening on port 5000");

wss.on("connection", function(ws) {
  ws.isAlive = true;
  ws.on("pong", heartbeat);

  ws.on("message", function(message) {
    console.log("received: %s", message);
  });
});

function returnData() {
  return Math.random();
}

function heartbeat() {
  this.isAlive = true;
}

function getTimeoutDelay() {
  return Math.floor(Math.random() * 40) * 100;
}

const timeoutFunc = () => {
  clearTimeout(timeout);
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.send(JSON.stringify(returnData()));
  });
  timeout = setTimeout(timeoutFunc, randomTimeoutDelay);
};

let timeout = setTimeout(timeoutFunc, 500);
