const { lstatSync } = require("fs");
const { join } = require("path");
const express = require("express");

const app = express();
let server;

const isDirectory = (source) => lstatSync(source).isDirectory();

process.on("SIGINT", () => {
  server.close();
  process.exit("🔥 Killed it with fire");
});

process.on("exit", (msg) => {
  console.log(msg);
});

const givenDir = process.argv[2] || ".";
const dir = join(process.cwd(), givenDir);
if (!isDirectory(dir)) process.exit(`🤷‍♂️ ${dir} is not a valid directory`);

const givenPort = process.argv[3] || 80;
app.use(express.static(dir));
server = app.listen(givenPort, () => {
  console.log(`🤖 Opening ${dir} on localhost:${givenPort}`);
});
