const express = require('express')
const app=express()
const port=8000;
const mongoose=require('mongoose')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/');
const blogSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
});
const Blog = mongoose.model('Blog', blogSchema);
const small = new Blog({ title:'Hello',author:'tester'});
small.save(function (err) {
    console.log(err)
    // saved!
  });
app.post('/api',function(req,res){
    console.log(req.body)
    //content is a json file contain all information you sent from postman 
    const content=req.body
    //result is a array content all your information
    var result = [];
    for(var i in content)
    result.push([i, content [i]]);
    console.log(result)
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

