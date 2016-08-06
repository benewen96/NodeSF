var SFserver = require("./conn.js");

module.exports = {
    //params: conn: connection instance, callback: return object
    newRecord : function(callback) {
    SFserver.Connect(function(err, connection) { //connect to sf
    	if(err) {
    		return(err);
    	}
    	else {
    		console.log('Connect success');

    		connection.sobject("Record__c").create({ Name : 'I am a node object' }, function(err, ret) {
	            if (err || !ret.success) { return callback(err); } //if internal error or sf error return the error
	            return callback('RECORD CREATED: ' + ret.id);
        	});

        	}
    	});
	},

	deleteRecords : function(callback) { //delete records will return to a user defined callback when appropriate
	//callback trace (2) -------|________|
	var queryRes = [];
	SFserver.Connect(function(err, connection) { //connect to sf
	    if(err) {
	       	return(err);
	    }
	    else {
	    	var deleteResults = function() {
				connection.sobject("Record__c")
					.find({Name : 'I am a node object' })
					.destroy(function(err, rets) {
						if(err) {return console.error(err); }
						//something useful to return to our callback
						return callback(queryRes); //trace start (1)
					});
			}

			connection.query("select Name, Id from Record__c")
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

}


