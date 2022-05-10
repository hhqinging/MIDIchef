//import field
import express from 'express'
import mongoose from 'mongoose';
import Track from "../models/track-model.js";
import {Create_song,Update_song} from './database_ops.js'
//const and var
var router=express.Router()
const { Schema } = mongoose;
const url = "mongodb://localhost:27017/cse416";
//mongoose connection
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get('/get_song',function(req,res){
    var data
    for (var key in req.query) {
       data= req.query[key];
    }
    Track.find().where(Object.keys(req.query)[0]).equals(data).then(test=>{
        console.log(req)
        if(test.length==0){
            res.status(200).json({
                Info: "result not founded"
            })
        }
        else{
        console.log(test)
        res.status(200).json(
            
            test
        )}
})
})
router.get('/get_song1',function(req,res){
    var data
    for (var key in req.query) {
       data= req.query[key];
    }
    Track.find().where(Object.keys(req.query)[0]).equals(data).then(test=>{
        console.log(req)
        if(test.length==0){
            res.status(200).json({
                Info: "result not founded"
            })
        }
        else{
        console.log(test)
        res.status(200).json(
            
            test[0]
        )}
})
})
router.post('/update_song',function(req,res){
    Update_song(req.body)
    console.log(req.body)
    res.send({
        note:"update success!"
    })
})
router.post('/save_song',function(req,res){
    Create_song(req.body)
    res.send({
        note:"save success!"
    })
})
export default router;

