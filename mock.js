const express = require("express");

const proxyAddr = {
  // port: url
  [process.argv[3] || 80]: process.argv[2]
};

let server = [];

Object.keys(proxyAddr).forEach(port => {
  const app = express();
  const address = proxyAddr[port];

  app.use("/*", (req, res) => {
    let url = `${address}/${req.params[0]}`;
    console.log(`🙅🏽‍♂️ proxy calling ${url}`);

    const json = require(`./mocks/${url}.json`);
    return setTimeout(() => {
      return res.json(json);
    }, Math.random() * 1000);
  });

  server.push(
    app.listen(port, () =>
      console.log(`🤖 Routing requests from localhost:${port} to ${address}`)
    )
  );
});

process.on("SIGINT", () => server.forEach(s => s.close()));
process.on("exit", () => console.log("🔥 Killed it with fire"));
