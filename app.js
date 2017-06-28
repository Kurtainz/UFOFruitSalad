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
		// If user does not supply a name, will randomly generate one with chance
		if (!request.body.name) {
			request.body.name = chance.first();
		}

		parsedContent.scores.push(request.body);

		// Sort the scores so they are in descending order
		parsedContent.scores.sort(function(a, b) {
				return b.score - a.score;
			});

		// Check to see if scoreboard length is greater than 14. If so, discard the lowest score. 
		if (parsedContent.scores.length > 14) {
			parsedContent.scores.pop();
		}

		// Write JSON to disk
		fs.writeFile('scripts/scores.json', JSON.stringify(parsedContent), function(error) {
			if (error) {
				console.log("Unable to write file");
			}
		});
	});
});

app.listen(process.env.PORT, process.env.IP, function() {
	console.log('Server started');
});