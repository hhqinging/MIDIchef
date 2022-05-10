//import field
import express from 'express'
import mongoose from 'mongoose';
import Users from "../models/user-model.js";
import {Create_new_user,Update_user} from './database_ops.js'
import {JWT} from '../auth/library.js';
//const and var
var router=express.Router()
const { Schema } = mongoose;

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

export default router;

