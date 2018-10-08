const { lstatSync } = require('fs');
const { join } = require('path');
const express = require('express');

const app = express();
let server;

const isDirectory = source => lstatSync(source).isDirectory();

process.on('SIGINT', () => {
  server.close();
  process.exit('🔥 Killed it with fire');
});

process.on('exit', msg => {
  console.log(msg);
});

const givenDir = process.argv[2] || '.';
const dir = join(process.cwd(), givenDir);
if (!isDirectory(dir)) process.exit(`🤷‍♂️ ${dir} is not a valid directory`);

app.use(express.static(dir));
server = app.listen(1337, () => {
  console.log(`🤖 Opening ${dir} on localhost:1337`);
});
