import express from "express";
import Track from "../models/trackModel.js";

const trackRouter = express.Router();

trackRouter.get("/", async (req, res) => {
  const tracks = await Track.find();
  res.send(tracks);
});

trackRouter.get("/assetID/:assetID", async (req, res) => {
  const track = await Track.findOne({ assetID: req.params.assetID });
  if (track) {
    res.send(track);
  } else {
    res.status(404).send({ message: "Track NFT Not Found" });
  }
});

trackRouter.get("/assetID/:assetID", async (req, res) => {
  const track = await Track.findOne({ assetID: req.params.assetID });
  if (track) {
    res.send(track);
  } else {
    res.status(404).send({ message: "Track NFT Not Found" });
  }
});

export default trackRouter;

// module.exports = trackRouter;
