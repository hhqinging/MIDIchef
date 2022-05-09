import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import song from "./routers/songs_op.js";
import user from "./routers/user_op.js";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connedted to db");
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
app.use("/api/song", song);
app.use("/api/user", user);
app.post("/api/auth", (req, res) => {
  console.log("wwwwwww:", req.body);
  // if (user.length) {
  // create a token using user name and password vaild for 2 hours
  let token_payload = {
    accounts: req.body.accounts,
    addresses: req.body.addresses,
  };
  let token = jwt.sign(token_payload, "jwt_secret_password", {
    expiresIn: "2h",
  });
  let response = {
    message: "Token Created, Authentication Successful!",
    token: token,
  };

  // return the information including token as JSON
  return res.status(200).json(response);
  // } else {
  //   return res.status("409").json("Authentication failed. admin not found.");
  // }
});

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
