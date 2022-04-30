import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import trackRouter from "./routes/trackRoutes.js";
import { userSignUpCtrl } from "./controllers/userCtrl.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

const app = express();

//config the .env, MONGODB_URI in it
dotenv.config();

//connect mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connedted to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

//middleware
app.use(express.json());

//user routes
app.use("/api/user", userRouter);

app.use("/api/seed", seedRouter);
app.use("/api/tracks", trackRouter);

app.get("/api/tracks", (req, res) => {
  res.send(data.tracks);
});

// app.get("/api/tracks/assetID/:assetID", (req, res) => {
//   const track = data.tracks.find((x) => x.assetID === req.params.assetID);
//   if (track) {
//     res.send(track);
//   } else {
//     res.status(404).send({ message: "Track NFT Not Found" });
//   }
// });

//error handle
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
