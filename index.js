const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
	var options = {
		root: path.join(__dirname, 'static', 'html'),
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	}

	let fileName = 'landing.html';

	res.status(200).sendFile(fileName, options, (err) => {
		if(err){
			console.log(err);
		}
		else{
			console.log("sent: ", fileName);
		}
	});
});

app.get('/about/', (req, res) => {
	var options = {
		root: path.join(__dirname, 'static', 'html'),
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	}

	let fileName = 'about.html';

	res.status(200).sendFile(fileName, options, (err) => {
		if(err){
			console.log(err);
		}
		else{
			console.log("sent: ", fileName);
		}
	});
});

app.get('/proyects/', (req, res) => {
	var options = {
		root: path.join(__dirname, 'static', 'html'),
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	}

	let fileName = 'temp.html';

	res.status(200).sendFile(fileName, options, (err) => {
		if(err){
			console.log(err);
		}
		else{
			console.log("sent: ", fileName);
		}
	});
});

app.get('/archives/', (req, res) => {
	var options = {
		root: path.join(__dirname, 'static', 'html'),
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	}

	let fileName = 'archives.html';

	res.status(200).sendFile(fileName, options, (err) => {
		if(err){
			console.log(err);
		}
		else{
			console.log("sent: ", fileName);
		}
	});
});

app.get('/static/:dir/:fileName', (req, res) => {
	let dir = req.params.dir;

	var options = {
		root: path.join(__dirname, 'static', dir),
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	}

	let fileName = req.params.fileName;

	res.status(200).sendFile(fileName, options, (err) => {
		if(err){
			console.log(err);
		}
		else{
			console.log("sent: ", fileName);
		}
	});
});

app.listen(3000, (err) => {
	if(err){
		console.log(err);
	}
	else{
		console.log('listening on localhost:3000');
	}
});