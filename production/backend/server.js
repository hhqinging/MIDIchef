import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from "dotenv";
import song from './routers/songs_op.js'
import user from './routers/user_op.js'
const { Schema } = mongoose;

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connedted to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const url = "mongodb://localhost:27017/cse416";
mongoose.connect(url).then((ans) => {
     console.log("connect Success");
        }).catch((err) => {
     console.log("Error");
    });
const app=express()
const port=8000;
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

