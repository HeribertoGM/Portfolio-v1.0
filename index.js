const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	let filePath = path.join(__dirname, 'static', 'try.json');
	let datos = JSON.parse(fs.readFileSync(filePath));

	res.status(200).render('./es/landingES', {data: datos}, (err, html) => {
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
	res.status(200).render('./es/aboutES', (err, html) => {
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
	res.status(200).render('./es/archivesES', (err, html) => {
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

app.get('/proyects/:id', (req, res) => {
	let filePath = path.join(__dirname, 'static', 'try.json');
	let datos = JSON.parse(fs.readFileSync(filePath));

	let id = req.params.id;
	let proy;
	for(let i of datos){
		if(id == i.id){
			proy = i;
		}
	}

	console.log(proy);
	res.status(200).send(proy);
});

app.get('/proyects/', (req, res) => {
	let filePath = path.join(__dirname, 'static', 'try.json');
	let datos = JSON.parse(fs.readFileSync(filePath));
	let num = datos.length;

	res.status(200).render('./es/proyectsES', {data: datos, len: num}, (err, html) => {
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
	let fileName = req.params.fileName;

	var options = {
		root: path.join(__dirname, 'static', dir),
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	}

	res.status(200).sendFile(fileName, options, (err) => {
		if(err){
			console.log(err);
		}
		else{
			console.log("sent: ", fileName);
		}
	});
});

app.post('/email/', (req, res) => {
	let form = req.body;
	if(form.name && form.email && form.title && form.msg){
		res.send("completo")
	}
	else{
		res.send("incompleto");
	}
});

app.listen(3000, (err) => {
	if(err){
		console.log(err);
	}
	else{
		console.log('listening on localhost:3000');
	}
});




