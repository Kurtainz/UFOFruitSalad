var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var Chance = require('chance');
var chance = new Chance();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/', function(request, response) {
	response.sendFile('game.html', { root : __dirname });
});

app.get('/scores.json', function(request, response) {
	response.sendFile('scripts/scores.json', {root : __dirname});
});

app.post('/scoreupdate', function(request, response) {
	fs.readFile('scripts/scores.json', function(error, content) {
		if (error) {
			console.log("Unable to access scores file");
		}
		// Load JSON file into memory to edit
		var parsedContent = JSON.parse(content);
		if (!request.body.name) {
			request.body.name = chance.first();
		}
		parsedContent.scores.push(request.body);
		if (parsedContent.scores.length > 20) {
			parsedContent.shift();
		}
		fs.writeFile('scripts/scores.json', JSON.stringify(parsedContent), function(error) {
			if (error) {
				console.log("Unable to write file");
			}
		});
	});
});

app.listen(process.env.PORT, process.env.IP, function() {
	var time = new Date();
    var hours = (time.getHours());
    var minutes = time.getMinutes();
    if (time.getMinutes() < 10) {
        minutes = "0" + time.getMinutes();
    }
    console.log("Server started at: " + hours + ":" + minutes);
});