// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://Kurtainz:CyJo1JSRsm1fTGaI@ufofsscores-shard-00-00-o2e49.mongodb.net:27017,ufofsscores-shard-00-01-o2e49.mongodb.net:27017,ufofsscores-shard-00-02-o2e49.mongodb.net:27017/UFOFSScores?ssl=true&replicaSet=UFOFSScores-shard-0&authSource=admin", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

