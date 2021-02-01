const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const nm = require('nodemailer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

const transporter = nm.createTransport({
  service: 'gmail',
  auth: {
	user: 'gilheribertosender@gmail.com',
	pass: 'Alejandro-9010'
  }
});

/*
*	landing
*/
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
			console.log('sent: landingES');
		}
	});
});

app.get('/en/', (req, res) => {
	let filePath = path.join(__dirname, 'static', 'try.json');
	let datos = JSON.parse(fs.readFileSync(filePath));

	res.status(200).render('./en/landingEN', {data: datos}, (err, html) => {
		if(err){
			res.send('<h1> something fucked up </h1>');
			console.log(err);
		}
		else{
			res.send(html);
			console.log('sent: landingEN');
		}
	});
});

app.get('/jp/', (req, res) => {
	res.status(200).send("<h1>Working!</h1>");
});

/*
*	about
*/
app.get('/about/', (req, res) => {
	res.status(200).render('./es/aboutES', (err, html) => {
		if(err){
			res.send('<h1> something fucked up </h1>');
			console.log(err);
		}
		else{
			res.send(html);
			console.log('sent: aboutES');
		}
	});
});

app.get('/en/about/', (req, res) => {
	let filePath = path.join(__dirname, 'static', 'try.json');
	let datos = JSON.parse(fs.readFileSync(filePath));

	res.status(200).render('./en/aboutEN', {data: datos}, (err, html) => {
		if(err){
			res.send('<h1> something fucked up </h1>');
			console.log(err);
		}
		else{
			res.send(html);
			console.log('sent: aboutEN');
		}
	});
});

/*
*	archives
*/
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

app.get('/en/archives/', (req, res) => {
	let filePath = path.join(__dirname, 'static', 'try.json');
	let datos = JSON.parse(fs.readFileSync(filePath));

	res.status(200).render('./en/archivesEN', {data: datos}, (err, html) => {
		if(err){
			res.send('<h1> something fucked up </h1>');
			console.log(err);
		}
		else{
			res.send(html);
			console.log('sent: archivesEN');
		}
	});
});

/*
*	single
*/
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
	res.status(200).render('./es/singleES', {data: proy}, (err, html) => {
		if(err){
			res.send('<h1> something fucked up </h1>');
			console.log(err);
		}
		else{
			res.send(html);
			console.log('sent: singleES');
		}
	});
});

app.get('/en/proyects/:id', (req, res) => {
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
	res.status(200).render('./en/singleEN', {data: proy}, (err, html) => {
		if(err){
			res.send('<h1> something fucked up </h1>');
			console.log(err);
		}
		else{
			res.send(html);
			console.log('sent: singleEN');
		}
	});
});

/*
*	proyects
*/
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
			console.log('sent: proyectsES');
		}
	});
});

app.get('/en/proyects/', (req, res) => {
	let filePath = path.join(__dirname, 'static', 'try.json');
	let datos = JSON.parse(fs.readFileSync(filePath));
	let num = datos.length;

	res.status(200).render('./en/proyectsEN', {data: datos, len: num}, (err, html) => {
		if(err){
			res.send('<h1> something fucked up </h1>');
			console.log(err);
		}
		else{
			res.send(html);
			console.log('sent: proyectsEN');
		}
	});
});

/*
*	statics
*/
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

/*
*	adding
*/
app.post('/email/', (req, res) => {
	let form = req.body;
	if(form.name && form.email && form.title && form.msg){
		let filePath = path.join(__dirname, 'static', 'mail.json');
		let mails = JSON.parse(fs.readFileSync(filePath));

		mails.push(form);

		let data = JSON.stringify(mails, null, 4);
		fs.writeFile('./static/mail.json', data, (err) => {
			if(err){
				console.log("Error: " + err);
			}
			else{
				console.log("Archivo reescrito");
			}
		});

		let mailOptions = {
			from: 'gilheribertosender@gmail.com',
			to: 'gilheriberto2@gmail.com',
			subject: form.title,
			text: `from: ${form.email}\nname: ${form.name}\nmessage: ${form.msg}`
		};

		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

		res.send("<h1>Enviado!</h1><br><a href='/'>Regresar</a>");
	}
	else{
		res.send("<h1>Incompleto :(</h1><br><a href='/'>Regresar</a>");
	}
});

/*
*	listen
*/
app.listen(3000, (err) => {
	if(err){
		console.log(err);
	}
	else{
		console.log('listening on localhost:3000');
	}
});




