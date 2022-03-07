const express = require('express')
const cors = require('cors');
const fs = require('fs')
var db = require('../mongoDB/mongo_op');

const app = express()
const port = 3000

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

const path = require('path');
app.use(express.static(path.join(__dirname)))


app.get('/', function(req, res) {
  db.mongo_find('users', {}, {projection: {_id: 0, username: 1, description: 1}}, 'demo-users.json').catch(console.dir);
  let json_data = fs.readFileSync('demo-users.json');
  let users_html = "";
  let users = JSON.parse(json_data);
  for(let x in users){
    users_html += `<div class="demo-supporters-cells">
        <h4> ${users[x].username} </h4>
        <p> ${users[x].description} </p>
    </div>`;
  }
  let demo_html = fs.readFileSync('demo-copy.html', 'utf-8');
  let result = demo_html.replace(/<div class="demo-supporters">(.|\n)*?<\/div>/g, 
    `<div class="demo-supporters">
      ${users_html}
    <\/div>\n`);
  fs.writeFileSync('demo.html', result)
  res.sendFile(path.join(__dirname, 'demo.html'))
})

app.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname, 'demo-signup.html'));
})

app.post('/signup', function(req, res) {
  console.log(req.body["name"])
  console.log(req.body["bio"])
  db.mongo_insert('users', {
    username: req.body["name"], 
    address: "",
    pfp: "",
    description: req.body["bio"],
    created: [],
    collected: [],
    favorite: [],
    followers: [],
    following: []
  })
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
