import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import trackRouter from "./routes/trackRoutes.js"

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connedted to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

// const dbConnect = require("./config/db/dbConnect");

const app = express();

app.use("/api/seed", seedRouter);
app.use("/api/tracks", trackRouter);

// app.get("/api/tracks", (req, res) => {
//   res.send(data.tracks);
// });


// app.get("/api/tracks/assetID/:assetID", (req, res) => {
//   const track = data.tracks.find((x) => x.assetID === req.params.assetID);
//   if (track) {
//     res.send(track);
//   } else {
//     res.status(404).send({ message: "Track NFT Not Found" });
//   }
// });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
