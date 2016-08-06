module.exports = {
    //params: conn: connection instance, callback: return object
    Create : function(conn, callback) {
        //create a record object with name, on success callback return object
        conn.sobject("Record__c").create({ Name : 'I am a node object' }, function(err, ret) {
            if (err || !ret.success) { return callback(err, null); } //if internal error or sf error return the error
            return callback(null,ret);  //return object up the event stack
        });
    }
}


