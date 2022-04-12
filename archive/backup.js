const express = require('express')
var mongoose = require('mongoose')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://hash:Password123@cse416-hash.xwa7t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var connection = mongoose.connection;
//Get the default connection
//Bind connection to error event (to get notification of connection errors)
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
const trackschema = new mongoose.Schema({ 
  name: String,
  description: String,
  createdBy: String,
  ownedBy: String,
  favorated: Number,
  popularity: Number,
  price: String,
  views: Number,
  filepath: String,
  length: String,
  });

const Track = mongoose.model('tracks', trackschema);


app.get('/', function(req, res) {
  res.sendFile('/root/test/test.html');
})
function getTrackQuery(name){
  var query = Track.find({name:name});
  return query;
}
app.post('/search', function(req, res) {
 // console.log(req.body)
  const search_name=req.body.name;
  const query=getTrackQuery(search_name);

  query.exec(function(err,results){
    
    if(err){
      return console.log(err);}
    console.log("???");
    results.forEach(function(result){
       console.log(result.price);
       console.log(result.name);
    });
  })
  res.send();
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
