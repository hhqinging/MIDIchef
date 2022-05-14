//import field
import cors from "cors";
import express from 'express'
import mongoose from 'mongoose';
import Users from "../models/user-model.js";
import {Create_new_user,Update_user} from './database_ops.js'
import {JWT} from '../auth/library.js';
import morgan from "morgan";
import fileUpload from "express-fileupload";

var router=express.Router()
router.use(
    fileUpload({
        createParentPath: true,
    })
);
router.use(morgan("dev"));
//const and var

const { Schema } = mongoose;
router.use(cors());
//mongoose connection
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get('/get_user',function(req,res){
    var data
    for (var key in req.query) {
       data= req.query[key];
    }
    Users.find().where(Object.keys(req.query)[0]).equals(data).then(test=>{
        if(test.length==0){
            res.status(404).json({
                Info: "user not founded"
            })
        }
        else{
        res.status(200).json({
            Info: "result founded",
            data: test
        })}
})
})

router.post('/auth',function(req,res){
    Users.findOne().where("walletAddr").equals(req.body.walletAddr).then(result=>{
        if(result==undefined){
            Create_new_user(req.body)
            let token_payload = {
                wallet: req.body.WalletA
                };
            let token=JWT(token_payload)    
            res.status(200).json({
                Info: "user not founded, create new user",
                jwt: token,
                login:1     
            })
        }
        else{
        let token_payload = {
            wallet: req.body.WalletA
            };
        let token=JWT(token_payload)  
        res.status(200).json({
            Info: "result founded",
            jwt: token,
            login:1 
        })}
})
})
router.post('/update_user',function(req,res){
    Update_user(req.body)
    console.log(req.body)
    res.send({
        note:"update success!"
    })
})

router.post('/setting',function(req,res){
    
    try {
        if (!req.files.imageCover || req.body.userName == '' || req.body.description == 0) {
            
            res.status(500).send("No complete info!");
        } else {
            let imageUser = req.files.imageCover;
            let ext_img=req.files.imageCover.name.split('.')[1];
            imageUser.mv("./uploads/imageUser/" + imageUser.md5 +"." +ext_img);
            let data={
                walletAddr : "7781s55s41s5s3311s1",
                username : req.body.userName,
                description: req.body.description,
                profilePhoto: "http://47.252.29.19:8000/api/tracks/upser_file?photo="+ imageUser.md5 + "."+ ext_img,
            }
            Update_user(data)
            res.status(200).json()
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})

export default router;

