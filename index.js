const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	let filePath = path.join(__dirname, 'static', 'try.json');
	let datos = JSON.parse(fs.readFileSync(filePath));

	res.status(200).render('landing', {data: datos}, (err, html) => {
		if(err){
			res.send('<h1> something fucked up </h1>');
			console.log(err);
		}
		else{
			res.send(html);
			console.log('sent: landing');
		}
	});
});

app.get('/about/', (req, res) => {
	res.status(200).render('about', (err, html) => {
		if(err){
			res.send('<h1> something fucked up </h1>');
			console.log(err);
		}
		else{
			res.send(html);
			console.log('sent: about');
		}
	});
});

app.get('/archives/', (req, res) => {
	res.status(200).render('archives', (err, html) => {
		if(err){
			res.send('<h1> something fucked up </h1>');
			console.log(err);
		}
		else{
			res.send(html);
			console.log('sent: archives');
		}
	});
});

app.get('/proyects/', (req, res) => {
	let filePath = path.join(__dirname, 'static', 'try.json');
	let datos = JSON.parse(fs.readFileSync(filePath));
	let num = datos.length;

	res.status(200).render('proyects', {data: datos, len: num}, (err, html) => {
		if(err){
			res.send('<h1> something fucked up </h1>');
			console.log(err);
		}
		else{
			res.send(html);
			console.log('sent: proyects');
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