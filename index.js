const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const express = require('express');
const inquirer = require('inquirer');

const app = express();
let server;

const blacklistedDirs = ['node_modules']
const isDirectory = source => lstatSync(source).isDirectory()
const isSymLink = (source) => lstatSync(source).isSymbolicLink()

const getDirectories = source =>
  readdirSync(source).map(name => join(source, name))
  	.filter(d => (isDirectory(d) || isSymLink(d)))
  	.filter(d => !blacklistedDirs.includes(d))


process.on('SIGINT', () => {
    console.log("Caught interrupt signal, closing server");
    server.close();
    process.exit();
});

const directory = inquirer.prompt({
	type: 'list',
	name: 'dir',
	message: 'Select the directory or symlink that points to the static site.',
	choices: [{name: '× Cancel', value: false}, new inquirer.Separator(), ...getDirectories('./sites')],
	default: 0,
}).then(runServer);

function runServer(choice) {
	const dir = choice.dir;
	if(!dir) process.exit();

	app.use(express.static(dir))
	server = app.listen(1337, () => {
		console.log(`NSA is opening ${__dirname}/${dir} on localhost:1337`);
	});
}