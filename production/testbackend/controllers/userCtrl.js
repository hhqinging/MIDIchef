import User from "../models/userModel.js";
import algosdk from "algosdk";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";

dotenv.config();

//connect to algo testnet
const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = " ";
const token = { "X-API-Key": process.env.APITOKEN };
const algodClient = new algosdk.Algodv2(token, algodServer, port);

//test if connect to algo testnet
algodClient
  .healthCheck()
  .do()
  .then(console.log("good"))
  .catch((e) => {
    console.error(e);
  });






//---------------------------------------
//user sign up
//---------------------------------------
export const userSignUpCtrl = asyncHandler(async (req, res) => {
  //check if user exi st
  //req?.body?.email == req.body && req.body.userName[is there any req obj? yes! then, is there any body obj? yes! then, is there any email]
  const userExist = await User.findOne({ email: req?.body?.email });

  if (userExist) throw new Error("User already exists");
  //   console.log(req.body);
  try {
    //user sign up
    const user = await User.create({
      userName: req?.body?.userName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);

    // res.json("user controller");
  } catch (error) {
    res.json(error);
  }
});





//---------------------------------------
//user sign in
//---------------------------------------
export const userSignInCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if email exists
  const userFound = await User.findOne({ email });

  //check if password is matched
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json(userFound);
  } else {
    res.status(401);
    throw new Error("Password is incorrect");
  }
});



