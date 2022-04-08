import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//check if connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.get("/api/track", (req, res) => {
  res.send();
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
