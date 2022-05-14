import React, { useState } from "react";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
import axios from "axios";
import { Button, Typography } from "@mui/material";

// import baseUrl from './utils/baseURL.js';
// const [signinData, setSigninData] = useState(
//   JSON.getItem("signinData")
//     ? JSON.parse(localStorage.getItem("signinData"))
//     : null
// );

export class MyAlgoLogin extends React.Component {

  // dispatch = useDispatch();
  

  constructor(props) {
    super(props);
    this.connect = this.connect.bind(this);
  }

  async connect() {
    try {
      const myalgo = new MyAlgoConnect();
      const accounts = await myalgo.connect();
      const addresses = accounts.map((account) => account.address);
      // this.props.setuserAddr(addresses);
      localStorage.setItem("myalgo-wallet-addresses", addresses);
      // console.log(this.state.accounts);
      axios
        .post(`http://localhost:8000/api/auth`, {
          accounts: accounts,
          addresses: addresses,
        })
        .then((response) => {
          console.log("response:", response);
          localStorage.setItem("x-access-token", response.data.token);
          localStorage.setItem(
            "x-access-token-expiration",
            Date.now() + 2 * 60 * 60 * 1000
          );
          console.log(response.data);
        })
        .catch((err) => Promise.reject("Authentication Failed!"));
      // console.log(this.state);
    } catch (err) {
      console.log(err);
    }
  }


  render() {
    return (

      <Button
        color="blue"
        className="login-buttons"
        id="myalgo-login-buttons"
        onClick={this.connect}
        style={{ fontSize: "18px", fontWeight: "bold" }}
      >
        Sign in
      </Button>
    );
  }
}

export class MyAlgoPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.purchase = this.purchase.bind(this);
  }

  async purchase() {
    const from = this.props.from;
    const to = this.props.to;
    const price = this.props.price * 1000000;
    const enc = new TextEncoder();
    const note = enc.encode(this.props.note);

    let transferAlgo = async (sender, recipient, amount, note=undefined) => {
      const myAlgoWallet = new MyAlgoConnect();
      const algodClient = new algosdk.Algodv2("", "https://node.testnet.algoexplorerapi.io", "");
      const params = await algodClient.getTransactionParams().do();
      params.fee = algosdk.ALGORAND_MIN_TX_FEE;
      params.flatFee = true;

      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        to: recipient,
        amount: amount,
        note: note,
        suggestedParams: params,
      });

      const signedTxn = await myAlgoWallet.signTransaction(
        txn.toByte()
      );
      const response = await algodClient
      .sendRawTransaction(signedTxn.blob)
      .do();
    }
  
    if (from === "")
      alert("Login with MyAlgo first");
    
    transferAlgo(from, to, price, note)
    // TODO: add Backend call to transfer NFT
  }

  render() {
    return (
      <button
        className="purchase-button"
        id="myalgo-purchase-buttons"
        onClick={this.purchase}
      >
        Buy With MyAlgo
      </button>
    );
  }
}

/*
 * props:
 *   creator: NFT creator
 */
export class MyAlgoCreateNFT extends React.Component {
  constructor(props) {
    super(props);
    this.createNFT = this.createNFT.bind(this);
  }

  createNFT() {
    let creator = this.props.creator;

    let transferAsset = async (sender, recipient, assetID, amount, note=undefined) => {
      const myAlgoWallet = new MyAlgoConnect();
      const algodClient = new algosdk.Algodv2("", "https://node.testnet.algoexplorerapi.io", "");
      const params = await algodClient.getTransactionParams().do();

      const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender,
        to: recipient,
        assetIndex: assetID,
        amount: amount,
        note: note,
        suggestedParams: params
      })
      const signedTxn = await myAlgoWallet.signTransaction(
        txn.toByte()
      );
      const response = await algodClient
      .sendRawTransaction(signedTxn.blob)
      .do();
    }
    //TODO: add backend call to createNFT
    let assetID = 
    transferAsset(creator, creator, assetID, 0); // Opt in to asset transfer
    // TODO: add backend call to transfer NFT from midichef to creator
  }

  render() {
    return (
      <button class="createasset-button" id="myalgo-createasset-buttons" onClick={this.createNFT}>create NFT</button>
    )
  }
}

/*
 * props:
 *   owner: address of NFT owner
 *   price: NFT price
 *   assetID: ID of NFT
 */
export class MyAlgoSellNFT extends React.Component {
  constructor(props) {
    super(props);
    this.sellNFT = this.sellNFT.bind(this);
  }

  sellNFT() {
    let owner = this.props.owner;
    let price = this.props.price;
    let assetID = this.props.assetID;

    let transferAsset = async (sender, recipient, assetID, amount, note=undefined) => {
      const myAlgoWallet = new MyAlgoConnect();
      const algodClient = new algosdk.Algodv2("", "https://node.testnet.algoexplorerapi.io", "");
      const params = await algodClient.getTransactionParams().do();

      const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender,
        to: recipient,
        assetIndex: assetID,
        amount: amount,
        note: note,
        suggestedParams: params
      })
      const signedTxn = await myAlgoWallet.signTransaction(
        txn.toByte()
      );
      const response = await algodClient
      .sendRawTransaction(signedTxn.blob)
      .do();
    }

    let midichef = "";
    transferAsset(owner, midichef, assetID, 1);
    // TODO: backend call to update NFT price in database
  }

  render() {
    return (
      <button class="sellasset-button" id="myalgo-sellasset-buttons" onClick={this.sellNFT}>sell NFT</button>
    )
  }
}
