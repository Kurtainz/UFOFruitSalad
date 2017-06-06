var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

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
		var parsedContent = JSON.parse(content);
		parsedContent.scores.push(request.body);
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