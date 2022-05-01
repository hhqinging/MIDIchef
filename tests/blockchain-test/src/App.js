import React from "react";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import algosdk from 'algosdk';
import { ethers } from "ethers";
import './App.css'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MetaMaskAddress: '',
      MyAlgoAddress: '',
      ethersProvider: new ethers.providers.Web3Provider(window.ethereum),
      myAlgoWallet: new MyAlgoConnect(),
			algodClient: new algosdk.Algodv2(
				'', 
				'https://node.testnet.algoexplorerapi.io', 
				''),

      trackOwner1: '0xd283bA6D6142074B73BBCE783af59ea68f9983a3',
      trackPrice1: 0.1,
      trackOwner2: 'WPOR3WN7SWWPGNXXLLCHNBJ4ALOI6TOCXSFN6RZ6EXFSPXOU2RKQHOAFC4',
      trackPrice2: 1
    }
    this.setMetaMaskAddress = this.setMetaMaskAddress.bind(this);
    this.setMyAlgoAddress = this.setMyAlgoAddress.bind(this);
  }

  setMetaMaskAddress(addr) {
    this.setState({MetaMaskAddress: addr})
  }

  setMyAlgoAddress(addr) {
    this.setState({MyAlgoAddress: addr})
  }

  render() {
    return (
      <div className="App" >
        <h1>Login example</h1>
        <MetaMaskLogin provider={this.state.ethersProvider} setAddress={this.setMetaMaskAddress} />
        <br></br>
        MetaMask address: {this.state.MetaMaskAddress}
        <br></br>
        <br></br>
        <MyAlgoLogin myAlgoWallet={this.state.myAlgoWallet} setAddress={this.setMyAlgoAddress} />
        <br></br>
        MyAlgo address: {this.state.MyAlgoAddress}
        <br></br>
        <br></br>
        <h1>Purchase example</h1>
        <div class="item-info">
        <p>Track Info</p>
          <p>Track Owner: {this.state.trackOwner1} </p>
          <p>Track price: {this.state.trackPrice1} Eth</p>
        </div>
        <MetaMaskPurchase 
          from={this.state.MetaMaskAddress}
          to={this.state.trackOwner1}
          price={this.state.trackPrice1}
          provider={this.state.ethersProvider}
        />
        <div class="item-info">
          <p>Track Info</p>
          <p>Track Owner: {this.state.trackOwner2} </p>
          <p>Track price: {this.state.trackPrice2} Algo</p>
        </div>
        <MyAlgoPurchase 
          // from={this.state.MyAlgoAddress}
          from={"WBBVOW7LKKTMB2HL4ZLN4W7QFH2DOEYXPZWC6NYNLUJACQP6JL5ZMNS27A"}
          to={this.state.trackOwner2}
          price={this.state.trackPrice2}
          myAlgoWallet={this.state.myAlgoWallet}
          algodClient={this.state.algodClient}
        />
      </div>
    );
  }
}


export class MetaMaskLogin extends React.Component {
  constructor(props) {
    super(props);
    this.connect = this.connect.bind(this);
  }

  async connect() {
    await this.props.provider.send("eth_requestAccounts", []);
    const address = await this.props.provider.getSigner().getAddress()
    this.props.setAddress(address)
  }

  render() {
    return (
      <button class="login-buttons" id="metamask-login-buttons" onClick={this.connect}>MetaMask</button>
    )
  }
}

export class MetaMaskPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.purchase = this.purchase.bind(this);
  }

  async purchase() {
    const signer = this.props.provider.getSigner();
    const txn = signer.sendTransaction({
      to: this.props.to,
      value: ethers.utils.parseEther(this.props.price.toString())
    });
    console.log(txn);
  }

  render() {
    return (
      <button class="purchase-button" id="metamask-purchase-buttons" onClick={this.purchase}>Buy With MetaMask</button>
    )
  }
}

export class MyAlgoLogin extends React.Component {
  constructor(props) {
    super(props);
    this.connect = this.connect.bind(this);
  }

  async connect() {
    try{
      const accounts = await this.props.myAlgoWallet.connect();
      const addresses = accounts.map(account => account.address);
      this.props.setAddress(addresses[0])
      console.log(accounts);
      console.log(addresses);
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <button class="login-buttons" id="myalgo-login-buttons" onClick={this.connect}>MyAlgo</button>
    )
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

    if(from === ''){
      alert("Login with MyAlgo first")
    }

    const params = await this.props.algodClient.getTransactionParams().do();
    params.fee = algosdk.ALGORAND_MIN_TX_FEE;
    params.flatFee = true;

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({ 
      from: from,
      to: to, 
      amount: amount,
      note: note,
      suggestedParams: params
    });
    const signedTxn = await this.props.myAlgoWallet.signTransaction(txn.toByte());
		console.log(signedTxn);
		const response = await this.props.algodClient.sendRawTransaction(signedTxn.blob).do();
		console.log(response)
  }

  render() {
    return (
      <button class="purchase-button" id="myalgo-purchase-buttons" onClick={this.purchase}>Buy With MyAlgo</button>
    )
  }
}

export class MyAlgoCreateNFT extends React.Component{
  constructor(props) {
    super(props);
    this.createNFT = this.createNFT.bind(this);
  }

  async createNFT() {
    let from = this.props.from;
    let defaultFrozen = false;
    let decimals = 0;
    let totalInssance = this.props.copies;
    let assetName = "Asset1";
    let assetMetadataHash = this.props.hash;
    let manager = this.props.from

    const params = await this.props.algodClient.getTransactionParams().do();
    params.fee = algosdk.ALGORAND_MIN_TX_FEE;
    params.flatFee = true;

    let txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: from,
      defaultFrozen: defaultFrozen,
      decimals: decimals,
      totalInssance: totalInssance,
      assetName: assetName,
      assetMetadataHash: assetMetadataHash,
      manager: manager,
      suggestedParams: params
    })

    let signedTxn = await this.props.myAlgoWallet.signTransaction(txn.toByte());
		console.log(signedTxn);
		let response = await this.props.algodClient.sendRawTransaction(signedTxn.blob).do();
		console.log(response)
  }

  render() {
    return (
      <button class="createasset-button" id="myalgo-createasset-buttons" onClick={this.createNFT}>create NFT</button>
    )
  }
}