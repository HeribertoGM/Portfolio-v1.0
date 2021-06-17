const path = require('path');
const fs = require('fs');
const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
	res.status(200).render('./jp/WIPJP', (err, html) => {
		if(err){
			res.send('<h1> something fucked up </h1>');
			console.log(err);
		}
		else{
			res.send(html);
			console.log('sent: WIPJP');
		}
	});
});

module.exports = router;