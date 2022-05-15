import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import song from "./routers/songs_op.js";
import user from "./routers/user_op.js";
import upload from "./routers/upload.js";
import nft from "./routers/algorand_op.js";
import http from 'http';
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

// const url = "mongodb://localhost:27017/cse416";
// mongoose
//   .connect(url)
//   .then((ans) => {
//     console.log("connect Success");
//   })
//   .catch((err) => {
//     console.log("Error");
//   });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 8000;
app.use("/api/tracks", song);
app.use("/api/user", user);
app.use("/api", upload);
app.use("/api/nft", nft)



const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.get("/api", (req, res) => {
  res.send("Hello")
});
//app.listen(port, () => {
 // console.log(`Example app listening on port ${port}`);
//});
var httpServer = http.createServer(app);

httpServer.listen(8000);