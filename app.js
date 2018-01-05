var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var db = db.db('mydb');
  assert.equal(null, err);
  console.log("Connected successfully to server");

//  db.close();
insertDocuments(db, function() {
//  db.close();
});

// findDocuments(db, function() {
//  db.close();
// });

findSomeDocuments(db,function(){

});

updateDocument(db,function(){

});

removeDocument(db,function(){

});

indexCollection(db,function(){

});
});

//inser documents
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('customers');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

//find all document
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('customers');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}


var findSomeDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('customers');
  // Find some documents
  collection.find({'a': 1}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}


var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('customers');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 3 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 3");
    callback(result);
  });
}

var removeDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteOne({ a : 1 }, function(err, result) {
    assert.equal(err, null);
  //  assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 1");
    callback(result);
  });
}

var indexCollection = function(db, callback) {
  db.collection('documents').createIndex(
    { "a": 1 },
      null,
      function(err, results) {
        console.log(results);
        callback();
    }
  );
};
