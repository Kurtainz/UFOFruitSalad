var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/', function(request, response) {
	response.sendFile('game.html', { root: __dirname });
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