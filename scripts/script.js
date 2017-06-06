function getData() {
	var request = new XMLHttpRequest();
	request.open('GET', 'scores.json', true);
	request.send();

	request.onload = function() {
		scores = JSON.parse(request.response);
		populateTable(scores);
	}
}

function clearTable() {
	var table = document.getElementById('scoreTable');
	// Check if the table has any contents, clear if it does
	if (table.tBodies.length > 0) {
		table.removeChild(table.getElementsByTagName('tbody')[0]);
	}
}

function populateTable(content) {
	clearTable();
	var table = document.getElementById('scoreTable');
	var tBody = table.createTBody();
	var sortedArray = content.scores.sort(function(a, b) {
		return b.score - a.score;
	});
	sortedArray.forEach(function(entry) {
		var row = tBody.insertRow();
		var cellName = row.insertCell();
		var cellScore = row.insertCell();
		cellName.innerHTML = entry.name;
		cellScore.innerHTML = entry.score;
	});
}

function postData(name, score) {
	var obj = {name : name, score : score};
	var request = new XMLHttpRequest();
	request.open('POST', 'scoreupdate', true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(JSON.stringify(obj));
}

getData();