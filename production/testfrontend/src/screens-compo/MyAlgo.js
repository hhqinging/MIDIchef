import React from "react";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
import axios from "axios";
// import baseUrl from './utils/baseURL.js';

export class MyAlgoLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: "",
      addresses: "",
    };
    this.connect = this.connect.bind(this);
  }

  async connect() {
    try {
      const myalgo = new MyAlgoConnect();
      const accounts = await myalgo.connect();
      // const accounts = await this.props.myAlgoWallet.connect();
      const addresses = accounts.map((account) => account.address);
      // this.props.setAddress(addresses[0])
      // console.log(accounts);
      // console.log(addresses);
      this.setState({ accounts: accounts, addresses: addresses });
      console.log(this.state.accounts);
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
      <button
        class="login-buttons"
        id="myalgo-login-buttons"
        onClick={this.connect}
      >
        MyAlgo
      </button>
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
    const amount = this.props.price * 1000000;
    const enc = new TextEncoder();
    const note = enc.encode(this.props.note);

    if (from === "") {
      alert("Login with MyAlgo first");
    }

    const params = await this.props.algodClient.getTransactionParams().do();
    params.fee = algosdk.ALGORAND_MIN_TX_FEE;
    params.flatFee = true;

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: from,
      to: to,
      amount: amount,
      note: note,
      suggestedParams: params,
    });
    const signedTxn = await this.props.myAlgoWallet.signTransaction(
      txn.toByte()
    );
    console.log(signedTxn);
    const response = await this.props.algodClient
      .sendRawTransaction(signedTxn.blob)
      .do();
    console.log(response);
  }

  render() {
    return (
      <button
        class="purchase-button"
        id="myalgo-purchase-buttons"
        onClick={this.purchase}
      >
        Buy With MyAlgo
      </button>
    );
  }
}

