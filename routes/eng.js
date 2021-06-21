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

/*
*	about
*/
router.get('/about', (req, res) => {
	res.status(200).render('./en/aboutEN', (err, html) => {
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
router.get('/cv', (req, res) => {
	res.status(200).render('./en/cvEN', (err, html) => {
		if(err){
			res.send('<h1> something fucked up </h1>');
			console.log(err);
		}
		else{
			res.send(html);
			console.log('sent: cvEN');
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
router.get('/proyects', (req, res) => {
	let filePath = path.join(__dirname, '..', 'static', 'try.json');
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

module.exports = router;