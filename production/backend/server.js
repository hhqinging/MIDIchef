import {SignUp,JWT} from './auth/library.js';
import express from 'express';
import cors from 'cors'
import * as data from "./data.js";
import mongoose from 'mongoose';
import Track from "./models/track-model.js";
import User from "./models/user-model.js";
import song from './routers/songs_op.js'
import user from './routers/user_op.js'
const { Schema } = mongoose;
const url = "mongodb://localhost:27017/cse416";
mongoose.connect(url).then((ans) => {
     console.log("connect Success");
        }).catch((err) => {
     console.log("Error");
    });
const app=express()
const port=8000;
//const signIn=require("../routes/signIn")
//const A=new Track({name:2300, walletAddr:320000});
//A.save()

//console.log(A.find({ walletAddr:320000 }).where('A'))
//const B=new User();
//B.save()
app.use('/api/song',song)
app.use('/api/user',user)
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

