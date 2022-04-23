const express = require('express')
const app=express()
const port=8000;
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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

