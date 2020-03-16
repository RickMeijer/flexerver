const express = require("express");
const axios = require("axios");
const https = require("https");
const cors = require("cors")();

const proxyAddr = {
  // port: url
  [process.argv[3] || 80]: process.argv[2]
};

const agent = new https.Agent({
  rejectUnauthorized: false
});

let server = [];

Object.keys(proxyAddr).forEach(port => {
  const app = express();
  const address = proxyAddr[port];
  app.use(cors);
  app.options("*", cors);

  app.use("/*", (req, res) => {
    let url = `${address}/${req.params[0]}`;
    console.log(`🙅🏽‍♂️ proxy calling ${url}`);

    axios({
      method: req.method,
      url,
      httpsAgent: agent
    })
      .then(response => {
        console.log("response has come");

        res.send(response.data);
      })
      .catch(err => {
        console.log(err);
        res.status(err.response.status).send(err.response.statusText);
      });
  });
  server.push(
    app.listen(port, () =>
      console.log(`🤖 Routing requests from localhost:${port} to ${address}`)
    )
  );
});

process.on("SIGINT", () => server.forEach(s => s.close()));

process.on("exit", () => console.log("🔥 Killed it with fire"));
