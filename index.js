const express = require("express");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

const app = express();
const port = process.env.PORT || 3000;

const esp = require("./routes/esp");
const eng = require("./routes/eng");
const jap = require("./routes/jap");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", esp);
app.use("/en", eng);
app.use("/jp", jap);

/*
 * statics imagenes de proyecto
 */
app.get("/static/:type/:dir/:fileName", (req, res) => {
	let type = req.params.type;
	let dir = req.params.dir;
	let fileName = req.params.fileName;

	var options = {
		root: path.join(__dirname, "static", type, dir),
		dotfiles: "deny",
		headers: {
			"x-timestamp": Date.now(),
			"x-sent": true,
		},
	};

	res.status(200).sendFile(fileName, options, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("sent: ", fileName);
		}
	});
});

/*
 *	statics general
 */
app.get("/static/:type/:fileName", (req, res) => {
	let type = req.params.type;
	let fileName = req.params.fileName;

	var options = {
		root: path.join(__dirname, "static", type),
		dotfiles: "deny",
		headers: {
			"x-timestamp": Date.now(),
			"x-sent": true,
		},
	};

	res.status(200).sendFile(fileName, options, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("sent: ", fileName);
		}
	});
});

/*
 *	listen
 */
app.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("listening on localhost:" + port);
	}
});
