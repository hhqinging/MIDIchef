import express from 'express'
import bodyParser from 'body-parser'
import multer from "multer";
import fs from "fs";
import fileUpload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";
import _ from "lodash";

var router = express.Router()
router.use(fileUpload({
    createParentPath: true
}));
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(morgan('dev'));

router.post('/upload', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let file = req.files.file;
            file.mv('./uploads/' + file.name);
            res.json({name: file.name});
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/upload-files', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = [];

            //loop all files
            _.forEach(_.keysIn(req.files.files), (key) => {
                let file = req.files.files[key];

                //move photo to uploads directory
                file.mv('./uploads/' + file.name);

                //push file details
                data.push({
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                });
            });

            //return response
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


export default router;




