import {SignUp,JWT} from './auth/library.js';
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
    let user = data.users.filter((users) => {
    return users.WalletA == req.body.WalletA;
    });
    console.log(data.users)
    let token_payload = {
        wallet: req.body.WalletA
        };
    console.log(token_payload)
    let token=JWT(token_payload)
    if (user.length){
    // create a token using user name and password vaild for 2 hours
    let response = {
    message: 'Token Created, Authentication Successful!',
    userName:user[0].user,
    token: token
    }; 
    // return the information including token as JSON
    return res.status(200).json(response);
   } else {
    SignUp();
    let response = {
    message: 'New User, Token Created, Authentication Successful!',
    userName:'defult',
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
        return songs.name == req.query.name;
        });
    console.log(song)
    if(song.length){
    let response = {
        message: 'song found!',
        name: song[0].name,
        creater:song[0].creater,
        length:song[0].length,
        likes:song[0].like,
        price:song[0].price,
        owner:song[0].owner,
        trans:song[0].trans,
        description:song[0].description
        }; 
    res.status(200).json(response);}
    else{
        let response = {
            message: 'Wrong song!',
            }; 
        return res.status(409).json(response)
    }
})
app.get('/api/GetUser',(req,res)=>{
    let user = data.users.filter((users) => {
        return users.user == req.query.user;
        });
    if (user.length){
        // create a token using user name and password vaild for 2 hours
        let response = {
        message: 'User found!',
        userName:user[0].user,
        Followers:user[0].Followers,
        description:user[0].description
        }; 
        // return the information including token as JSON
        return res.status(200).json(response);
        } else {
        SignUp();
        let response = {
        message: 'User Not found',
        }; 
        return res.status(404).json(response);
    }}); 

// app.get('/api/search',(req,res)=>{
//     let song = data.songs.filter((songs) => {
//         return songs.name == req.query.song||songs.creater == req.query.creater
//         });
//     if (song.length){
//         // create a token using user name and password vaild for 2 hours
//         let response = {
//          message: 'song found!',
//          name: song[0].name,
//          creater:song[0].creater,
//          length:song[0].length,
//          likes:song[0].like,
//          price:song[0].price,
//          owner:song[0].owner,
//          trans:song[0].trans,
//          description:song[0].description
//          }; 
//         // return the information including token as JSON
//         return res.status(200).json(response);
//         } else {
//         SignUp();
//         let response = {
//         message: 'User Not found',
//         }; 
//         return res.status(404).json(response);
//     }}); 
    

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

