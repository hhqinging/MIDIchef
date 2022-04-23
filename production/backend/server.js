import {SignUp,JWT} from './library.js';
import express from 'express';

import cors from 'cors'
import * as data from "./data.js";
const app=express()
const port=8000;
//const signIn=require("../routes/signIn")
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.post('/api/auth', (req,res) => {
    console.log(req.body)
    let WA = data.WA.filter((WA) => {
    return WA.WA == req.body.WA;
    });
    console.log(data.WA)
    let token_payload = {
        wallet: WA[0].WA
        };
    console.log(token_payload)
    let token=JWT(token_payload)
    if (WA.length){
    // create a token using user name and password vaild for 2 hours
    let response = {
    message: 'Token Created, Authentication Successful!',
    token: token
    }; 
    // return the information including token as JSON
    return res.status(200).json(response);
   } else {
    SignUp();
    let response = {
    message: 'New User, Token Created, Authentication Successful!',
    token: token
    }; 
    return res.status(200).json(response);
}}); 
//handle post request
app.post('/api/editProfile',(req,res)=>{
    console.log(req.body)
    let Data = req.body;
    let WA = data.WA.filter((WA) => {
        return WA.WA == req.body.WA;
        });
    if(WA.length){
    let response = {
        message: 'profile edited!',
        }; 
    res.status(200).json(response);}
    else{
        let response = {
            message: 'Wrong WA!',
            }; 
        return res.status(409).json(response)
    }

});
app.get('/api/track',(req,res)=>{
    console.log(req.query)
    let song = data.songs.filter((songs) => {
        return songs.song == req.query.song;
        });
    console.log(song)
    if(song.length){
    let response = {
        message: 'song found!',
        song: song[0].song,
        uploader:song[0].uploader,
        length:song[0].length,
        likes:song[0].like,
        price:song[0].price
        }; 
    res.status(200).json(response);}
    else{
        let response = {
            message: 'Wrong song!',
            }; 
        return res.status(409).json(response)
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

