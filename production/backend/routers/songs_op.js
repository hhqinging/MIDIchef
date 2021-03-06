//import field
import express from 'express'
import mongoose from 'mongoose';
import Track from "../models/track-model.js";
import users from "../models/user-model.js";
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
    .limit(60).then(test=>{
        if(test.length==0){
            res.status(200).json({
                Info: "result not founded"
            })
        }
        else{
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
    .limit(20).then(test=>{
        if(test.length==0){
            res.status(200).json({
                Info: "result not founded"
            })
        }
        else{
        // console.log(test)
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
        
        if (test.length == 0) {
            res.status(200).json({
                Info: "result not founded"
            })
        }
        else {
            // console.log(test)
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
    const regex = new RegExp(data, 'i')
    Track.find({ 'title': { $regex: regex} }).then(test => {

        if (test.length == 0) {
            res.status(200).json({
                Info: "result not founded"
            })
        }
        else {
            // console.log(test)
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
         } else {
        }
    });
})
router.get('/photo_file',function(req,res){
    let fileName=req.query.photo
    const __dirname = path.resolve();
    let options={ root: path.join(__dirname, './uploads/imageCover') }
    res.sendFile(fileName, options, function (err) {
        if (err) {

        } else {

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
router.post('/buy_it',async function(req,res){

    let walletAddr=req.body.walletAddr
    let assetID=req.body.assetID
    let old
    try{
    await users.find({ walletAddr: walletAddr }).then((test) => {
        old = test[0].userName
        
    })
    console.log(old)
    const filter = { assetID: assetID };
    const update = {
        owner: old,
    };
    Track.findOneAndUpdate(filter, update, {
        returnOriginal: false
    }, function (err, doc) {
        console.log(err)
    })
    res.status(200).json({info: "All good"})}
    catch(err){
        console.log(err)
        res.status(500).json({info: "err"})
    }
})
export default router;
