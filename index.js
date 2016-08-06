var SFserver = require("./conn.js");
var createRecord = require("./createRecord.js");
var express = require("express");
var conn = undefined;

//create a new record object
var newRecord = function(err) {
    SFserver.Connect(function(err, connection) { //connect to sf
        if(err) {
           return(err);
        }
        else {
            console.log('Connect success');
            conn = connection;  //pull connection to index.js
            createRecord.Create(conn, function(err, ret) { //call create record method
                if(err) {
                    return(err);
                }
                else {
                    return('RECORD CREATED: ' + ret.id);
                }
            });
        }
    });
}


var deleteRecords = function(callback) { //delete records will return to a user defined callback when appropriate
//callback trace (2) -------|________|
	var queryRes = [];
	SFserver.Connect(function(err, connection) { //connect to sf
	    if(err) {
	       	return(err);
	    }
	    else {
	    	conn = connection;
	    	
	    	var deleteResults = function() {
				conn.sobject("Record__c")
					.find({ Name : 'I am a node object' })
					.destroy(function(err, rets) {
						if(err) {return console.error(err); }
						//something useful to return to our callback
						return callback(queryRes.length + ' records deleted from salesforce'); //trace start (1)
					});
			}

			conn.query("select Name from Record__c")
			.on("record", function(record) { //on emit of a record
				queryRes.push(record);
			})
			.on("end", function(record) {	 //when query finished
				deleteResults();
			})
			.on("error", function(error) {   //on emit of an error
				console.error(err); 
			}).run();

			
		}
	});
}




var server = express();

server.get('/', function(req, res) {
	res.send(newRecord());
});

server.get('/del', function(req, res) {
	var info = undefined;
	//execute delete records function, when it completes, call function(info) callback
	deleteRecords(/*my callback def*/function(info) { //callback trace finish (3)
		res.send(info);
	});

	/* connect to sf server and run event-driven soql query, collate results in queryRes */
	 

});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
