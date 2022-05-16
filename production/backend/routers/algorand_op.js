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
        transferAsset(sender, recipient, assetID);
        res.status(200);
    }
    catch(err){
        res.status(500).send(err);
    }
})

export default router;
