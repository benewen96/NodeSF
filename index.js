var SFserver = require("./conn.js");
var recordIO = require("./record.js");
var express = require("express");
var conn = undefined;

var server = express();

server.get('/', function(req, res) {
	res.send('Welcome');
});

server.get('/create', function(req, res) {
	recordIO.newRecord(function(info) {
		res.send(info);
	});
});


server.get('/del', function(req, res) {
	var info = '<ol>';
	//execute delete records function, when it completes, call function(info) callback
	recordIO.deleteRecords(/*my callback def*/function(infoArray) { //callback trace finish (3)
		for(var i = 0; i < infoArray.length; ++i) {
			info += '<li>object: ' + infoArray[i].Id + ' with name: ' + infoArray[i].Name + ' successfully deleted.</li>';
		}
		info += '</ol>';
		res.send(info);
	});
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
