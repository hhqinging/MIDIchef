import express from "express";
import bodyParser from "body-parser";
import { Create_song } from "./database_ops.js";
import { createAsset } from '../cryptography/midichef-algo.js';
import multer from "multer";
import fs from "fs";
import fileUpload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";
import _ from "lodash";

var router = express.Router();
router.use(
    fileUpload({
        createParentPath: true,
    })
);
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(morgan("dev"));
import mongoose from 'mongoose';
import Users from "../models/user-model.js";
const { Schema } = mongoose;
router.post("/upload", async (req, res) => {
    console.log("addaaaaaaaaaaaa:", req.body);
    try {
        if (!req.files.music || !req.files.imageCover || req.body.title == '' || req.body.price == 0 || req.body.royalty == 0) {
            res.status(500).send("No complete info!");
        } else {
            let creator;
            console.log(req.body.walletAddr)
            Users.findOne().where('walletAddr').equals(req.body.walletAddr).then(result => {
                if (result.length == 0) {
                    res.status(500).json({ Info: "user unexist" })
                }
                else {
                    creator = result.userName;
                }
            })
            let music = req.files.music;
            let imageCover = req.files.imageCover;
            let ext_img = req.files.imageCover.name.split('.')[1];
            let ext_music = req.files.music.name.split('.')[1];
            music.mv("./uploads/music/" + music.md5 + "." + ext_music);
            imageCover.mv("./uploads/imageCover/" + imageCover.md5 + "." + ext_img);
            let assetID = await createAsset(req.body.title)
            let data = {
                creator: creator,
                assetID: assetID,
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                //royalty: req.body.royalty,
                src: "http://47.252.29.19:8000/api/tracks/song_file?song=" + music.md5 + "." + ext_music,
                img_src: "http://47.252.29.19:8000/api/tracks/photo_file?photo=" + imageCover.md5 + "." + ext_img
            }

            Create_song(data)
            res.status(200).json({ assetID: assetID })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});


router.post('/addNumFavorite', function (req, res) {
    console.log("addaaaaaaaaaaaa:", req.body.numFavorite);
    res.status(200).json({
        numFavorite: req.body.numFavorite
    })
})



// router.post("/upload-files", async (req, res) => {
//     try {
//         if (!req.files) {
//             res.send({
//                 status: false,
//                 message: "No file uploaded",
//             });
//         } else {
//             let data = [];

//             //loop all files
//             _.forEach(_.keysIn(req.files.files), (key) => {
//                 let file = req.files.files[key];

//                 //move photo to uploads directory
//                 file.mv("./uploads/" + file.name);

//                 //push file details
//                 data.   ({
//                     name: file.name,
//                     mimetype: file.mimetype,
//                     size: file.size,
//                 });
//             });

//             //return response
//             res.send({
//                 status: true,
//                 message: "Files are uploaded",
//                 data: data,
//             });
//         }
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

export default router;
