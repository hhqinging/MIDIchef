import User from "../models/userModel.js";
import algosdk from "algosdk";
import dotenv from "dotenv";

dotenv.config();

const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = " ";
const token = { "X-API-Key": process.env.TOKEN };

const algodClient = new algosdk.Algodv2(token, algodServer, port);

//test if connect to algo testnet
algodClient
  .healthCheck()
  .do()
  .then(console.log("good"))
  .catch((e) => {
    console.error(e);
  });




export const userSignUpCtrl = async (req, res) => {
  //   console.log(req.body);
  try {
    //user sign up
    const user = await User.create({
      //req.body || req.body.userName
      userName: req?.body?.userName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);

    // res.json("user controller");
  } catch (error) {
    res.json(error);
  }
};

export const 
