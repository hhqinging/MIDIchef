import express from "express";
import {transferAsset, destroyAsset} from '../cryptography/midichef-algo.js'

var router = express.Router();

router.post("/transferNFT", async (req, res) => {
    try{
        // let sender = req.body.sender;
        let recipient = req.body.creator;
        let assetID = req.body.assetID;
	console.log("recipient:", recipient);
	console.log("assetID:", assetID);
        await transferAsset(recipient, assetID);
        // console.log(test);
	res.status(200).send();
    }
    catch(err){
	console.log();
        res.status(500).send(err);
    }
})

export default router;
