const path = require('path');
const fs = require('fs');
const express = require('express');
let router = express.Router();

/*
*	landing
*/
router.get('/', (req, res) => {
	let filePath = path.join(__dirname, '..', 'static', 'try.json');
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

/*
*	about
*/
router.get('/about', (req, res) => {
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

/*
*	archives
*/
router.get('/archives', (req, res) => {
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

/*
*	single
*/
router.get('/proyects/:id', (req, res) => {
	let filePath = path.join(__dirname, '..', 'static', 'try.json');
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

/*
*	proyects
*/
router.get('/proyects', (req, res) => {
	let filePath = path.join(__dirname, '..', 'static', 'try.json');
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

module.exports = router;