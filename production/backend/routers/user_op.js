//import field
import express from 'express'
import mongoose from 'mongoose';
import Users from "../models/user-model.js";
import {Create_new_user,Update_user} from './database_ops.js'
//const and var
var router=express.Router()
const { Schema } = mongoose;
const url = "mongodb://localhost:27017/cse416";
//mongoose connection
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// mongoose.connect(url).then((ans) => {
//     console.log("connect Success");
//        }).catch((err) => {
//     console.log("Error");
//    });
//song_info
router.get('/get_user',function(req,res){
    var data
    for (var key in req.query) {
       data= req.query[key];
    }
    Users.find().where(Object.keys(req.query)[0]).equals(data).then(test=>{
        if(test==undefined){
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

router.post('/create_user',function(req,res){
    Create_new_user(req.body)
    console.log(req.body)
    res.send({
        note:"create success!"
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

