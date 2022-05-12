import express from "express";
import bodyParser from "body-parser";
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

router.post("/upload", async (req, res) => {
    // console.log("req.files:", req.files)
    // console.log("all:", req.body)
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No file uploaded",
            });
        } else {
            let music = req.files.music;
            let imageCover = req.files.imageCover;
            music.mv("./uploads/music/" + music.md5 + music.name);
            imageCover.mv("./uploads/imageCover/" + imageCover.md5 + imageCover.name);
            res.json({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                royalty: req.body.royalty,
                music: "./uploads/music/" + music.name + music.md5,
                imageCover: "./uploads/music/" + imageCover.name + imageCover.md5
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/upload-files", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No file uploaded",
            });
        } else {
            let data = [];

            //loop all files
            _.forEach(_.keysIn(req.files.files), (key) => {
                let file = req.files.files[key];

                //move photo to uploads directory
                file.mv("./uploads/" + file.name);

                //push file details
                data.push({
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size,
                });
            });

            //return response
            res.send({
                status: true,
                message: "Files are uploaded",
                data: data,
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
