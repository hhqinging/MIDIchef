import express from "express";
import {createAsset, transferAsset, destroyAsset} from '../cryptography/midichef-algo.js'

var router = express.Router();

router.post("/transferNFT", async (req, res) => {
    let sender = req.sender;
    let recipient = req.recipient;
    let assetID = req.assetID;
    transferAsset(sender, recipient, assetID);
})

export default router;