import express from 'express'
import mongoose from 'mongoose'
const app=express()
const port=8000;
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const { Schema } = mongoose;
import Tester from './tester.js'
mongoose.connect('mongodb://localhost:27017/');


app.post('/test',function(req,res){
  Tester.where('username').equals('tester').then(test=>{
    console.log(test)
    res.json({
        hello: 1,
        data: test
    })
  })
  
  
})
app.get('/save',function(req,res){
  const t1=new Tester({
    username:'tester',
    description: 'this is not a test'
  })
  t1.save()
  res.json({
    note: 'success'
  })
})
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

