var sf = require('jsforce');

    exports.Connect = function conn(callback) {
        var conn = new sf.Connection({
          // you can change loginUrl to connect to sandbox or prerelease env.
          // loginUrl : 'https://test.salesforce.com'
        });
        conn.login('benewen@salesforcenodejs.com', 'cquM6MnLS1wZkTWoxFl06PlujiJ0oTs12', function(err, userInfo) {
          if (err) { return callback(err, null); }
          // Now you can get the access token and instance URL information.
          // Save them to establish connection next time.
          // ...
          return callback(null, conn); //return connection on callback
        });
    }