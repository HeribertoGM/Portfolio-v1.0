const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const app = express();

const esp = require('./routes/esp');
const eng = require('./routes/eng');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use('/', esp);
app.use('/en', eng);

app.get('/jp/', (req, res) => {
	res.status(200).send("<h1>Working!</h1>");
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
*	listen
*/
app.listen(3000, '192.23.65.14', (err) => {
	if(err){
		console.log(err);
	}
	else{
		console.log('listening on 192.23.65.14:3000');
	}
});




