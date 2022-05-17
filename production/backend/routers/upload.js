import express from "express";
import bodyParser from "body-parser";
import { Create_song } from "./database_ops.js";
import { createAsset } from "../cryptography/midichef-algo.js";
import multer from "multer";
import fs from "fs";
import fileUpload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";
import _ from "lodash";
import mongoose from "mongoose";
import Users from "../models/user-model.js";
import tracks from "../models/track-model.js";
const { Schema } = mongoose;

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

router.post("/upload", async (req, res) => {
  try {
    if (
      !req.files.music ||
      !req.files.imageCover ||
      req.body.title == "" ||
      req.body.price == 0 
    //   req.body.royalty == 0
    ) {
      res.status(500).send("No complete info!");
    } else {
      let assetID = req.body.assetID;
      let creator;
      //console.log(req.body.walletAddr);
      await Users.findOne()
        .where("walletAddr")
        .equals(req.body.walletAddr)
        .then((result) => {
          if (result.length == 0) {
            res.status(500).json({ Info: "user unexist" });
          } else {
            creator = result.userName;
            console.log(result);
            
          }
        });
        console.log(creator);
      let music = req.files.music;
      let imageCover = req.files.imageCover;
      let ext_img = req.files.imageCover.name.split(".")[1];
      let ext_music = req.files.music.name.split(".")[1];
      music.mv("./uploads/music/" + music.md5 + "." + ext_music);
      imageCover.mv("./uploads/imageCover/" + imageCover.md5 + "." + ext_img);

      let data = {
        creator: creator,
        owner: creator,
        assetID: assetID,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        //royalty: req.body.royalty,
        src:
          "http://47.252.29.19:8000/api/tracks/song_file?song=" +
          music.md5 +
          "." +
          ext_music,
        img_src:
          "http://47.252.29.19:8000/api/tracks/photo_file?photo=" +
          imageCover.md5 +
          "." +
          ext_img,
      };

      Create_song(data);
      res.status(200).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/testupload", async (req, res) => {
  res.status(200).json({ assetID: 89450665 });
});

router.post("/addNumFavorite", function (req, res) {
  const filter = { assetID: req.body.assetID };
  const update = {
    numFavorite: req.body.numFavorite,
  };
  tracks.findOneAndUpdate(
    filter,
    update,
    {
      returnOriginal: false,
    },
    function (err, doc) {
      console.log(err);
      console.log(doc);
    }
  );
  res.status(200).json({
    numFavorite: req.body.numFavorite,
  });
});

export default router;
