var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var db = db.db('mydb');
  var collection = db.collection('customers');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
    //  assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      //callback(docs);
    });
});
