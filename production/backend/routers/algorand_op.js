import express from "express";
import {createAsset, transferAsset, destroyAsset} from '../cryptography/midichef-algo.js'

var router = express.Router();

router.get("/createNFT", async (req, res) => {
    let name = req.name;
    let assetID = await createAsset(name);
    res.send(assetID);
})

router.post("/transferNFT", async (req, res) => {
    let sender = req.sender;
    let recipient = req.recipient;
    let assetID = req.assetID;
    transferAsset(sender, recipient, assetID);
})

export default router;