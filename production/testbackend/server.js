import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/tracks", (req, res) => {
  res.send(data.tracks);
});
app.get("/api/tracks/assetID/:assetID", (req, res) => {
  const track = data.tracks.find((x) => x.assetID === req.params.assetID);
  if (track) {
    res.send(track);
  } else {
    res.status(404).send({ message: "Track Not Found" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
