const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
	res.send('HW!');
});

app.listen(3000, (err) => {
	if(err){
		console.log(err);
	}
	else{
		console.log('listening on localhost:3000');
	}
});