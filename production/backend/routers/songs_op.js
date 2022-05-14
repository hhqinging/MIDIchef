//import field
import express from 'express'
import mongoose from 'mongoose';
import Track from "../models/track-model.js";
import {Create_song,Update_song} from './database_ops.js'
import path from 'path'
//const and var
var router = express.Router()
const { Schema } = mongoose;
//mongoose connection
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get('/songlist', function (req, res) {
    for (var key in req.query) {
        data = req.query[key];
    }
    Track.find()
    .limit(10).then(test=>{
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
router.get('/trending', function (req, res) {
    for (var key in req.query) {
        data = req.query[key];
    }
    Track.find().sort({ numFavorite: -1 })
    .limit(10).then(test=>{
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
router.get('/single_song', function (req, res) {
    var data
    for (var key in req.query) {
        data = req.query[key];
    }
    Track.find().where(Object.keys(req.query)[0]).equals(data).then(test => {
        console.log(req)
        if (test.length == 0) {
            res.status(200).json({
                Info: "result not founded"
            })
        }
        else {
            console.log(test)
            res.status(200).json(

                test[0]
            )
        }
    })
})
router.get('/search', function (req, res) {
    // console.log("req.query:",req.query.searchKey)
    console.log("req.query:",req.query)
    var data
    for (var key in req.query) {
        data = req.query[key];
    }
    Track.find().where(Object.keys(req.query)[0]).equals(data).then(test => {
        console.log(req)
        if (test.length == 0) {
            res.status(200).json({
                Info: "result not founded"
            })
        }
        else {
            console.log(test)
            res.status(200).json(

                test
            )
        }
    })
})
router.get('/song_file',function(req,res){
    let fileName=req.query.song
    const __dirname = path.resolve();
    let options={ root: path.join(__dirname, './uploads/music') }
    res.set('Content-Type', 'audio/mpeg');
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log("err");
            console.log(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})
router.get('/photo_file',function(req,res){
    let fileName=req.query.photo
    const __dirname = path.resolve();
    let options={ root: path.join(__dirname, './uploads/imageCover') }
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log("err");
            console.log(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})
router.post('/update_song',function(req,res){
    Update_song(req.body)
    console.log(req.body)
    res.send({
        note: "update success!"
    })
})
router.post('/create_song', function (req, res) {
    Create_song(req.body)
    res.send({
        note: "save success!"
    })
})
export default router;