
const express = require('express')
const app=express()
const port=8000;
//const signIn=require("../routes/signIn")
var bodyParser = require('body-parser')
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.post('/api',function(req,res){
    console.log("?")
    console.log(req.body)
    res.send('Hello World')
})
app.get('/api',function(req,res){
    console.log("?")
    console.log(req.body)
    res.send('Hello World')
})
app.get('/',function(req,res){
    console.log("?")
    console.log(req.body)
    res.send('Hello World')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

