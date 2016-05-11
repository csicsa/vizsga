var express = require('express');
var app = express();
var fs = require("fs");
var pg = require('pg');
var bodyParser     =        require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/listUsers', function (req, res) {
	var ret;
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if (err) throw err;
		console.log('Connected to postgres! Getting schemas...');

		client
		.query('SELECT * FROM users')
		.on('row', function(row) {
			console.log(row)
			res.end(JSON.stringify(row));
		});
	});

})

app.post('/listUsers', function (req, res) {
	//INSERT INTO users ("name")
    //VALUES ('csongor');

    pg.connect(process.env.DATABASE_URL, function(err, client) {
    	if (err) throw err;
    	console.log('Connected to postgres! Getting schemas...');

    	client
    	.query('INSERT INTO users ("name") VALUES (\''+req.body.username+'\')')

    });
    res.end("Hello "+ req.body.username);
    
})



var port = process.env.PORT || 8080;

var server = app.listen(port, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)

})