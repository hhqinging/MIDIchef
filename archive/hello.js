const express = require('express')
const app = express()
const port = 3000
var mongobd = require('mongo_op.js')
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))


app.get('/', function(req, res) {
  res.sendFile('/root/test/test.html');
})

app.post('/search', function(req, res) {
  console.log(req.body)
  //post result
  const search_name=req.body.name;
  res.send();
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
