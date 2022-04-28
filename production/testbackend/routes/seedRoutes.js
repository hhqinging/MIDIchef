import express from "express";
import Track from "../models/trackModel.js";
import data from "../data.js";

// const Track = require("./models/trackModels");

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Track.remove({});
  const createTracks = await Track.insertMany(data.tracks);
  res.send({ createTracks });
});

export default seedRouter;
// module.exports = seedRouter;
