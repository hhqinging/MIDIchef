import React from "react";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import algosdk from 'algosdk';
import { formatJsonRpcRequest } from '@json-rpc-tools/utils'
import WalletConnect from "@walletconnect/client";
// import { ethers } from "ethers";
import './App.css'
const algodServer = 'https://testnet-algorand.api.purestake.io/ps2'
const algodToken = { 'X-API-Key': "90V6qN9ZfV4IquhUGv3VJ36iFek4CAXv2DomA88M" }
const algodPort = ''
const testNetClient = new algosdk.Algodv2(algodToken, algodServer, algodPort)
// "OZSEOGTJVPLLSWB4YBV6EFEILFOA3CVVESSYHO2OLEHNJTV3CH66G5M6KQ"
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org"
});

export async function apiGetAccountBalance(address = "ZPVYSQ5O7LWU54M5FAR77AMWUHJEUGXCBBJWNTSDP4U7MSNHBP2FQEV42I") {
  const accountInfo = await testNetClient.accountInformation(address).do()

  console.log(accountInfo.amount)
  // return accountInfo.amount
}
export async function apiSubmitTransaction(
  fromAddress,
  toAddress,
  algos,
  receiverProfileName,
  // connector
) {
  let params = await testNetClient.getTransactionParams().do()
  console.log("params:", params)
  params.fee = algosdk.ALGORAND_MIN_TX_FEE
  params.flatFee = true


  const enc = new TextEncoder()
  const donationNote = enc.encode(`ggg donation to.`)

  let donationTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: "ZPVYSQ5O7LWU54M5FAR77AMWUHJEUGXCBBJWNTSDP4U7MSNHBP2FQEV42I",
    to: "OZSEOGTJVPLLSWB4YBV6EFEILFOA3CVVESSYHO2OLEHNJTV3CH66G5M6KQ",
    amount: 1000000,
    note: donationNote,
    suggestedParams: params,
  })
  let donationTxId = donationTxn.txID().toString()

  console.log("donationTxId:", donationTxId)

  // const signedTxn = await myAlgoWallet.signTransaction(donationTxn.toByte());
  // console.log(signedTxn);
  // const response = await testNetClient.sendRawTransaction(signedTxn.blob).do();
  // console.log(response)
  const txns = [donationTxn]

  const txnsToSign = txns.map((txn) => {
    const encodedTxn = Buffer.from(
      algosdk.encodeUnsignedTransaction(txn)
    ).toString('base64')

    return {
      txn: encodedTxn,
      message: 'hhh'
    }
  })

  const requestParams = [txnsToSign]

  const request = await formatJsonRpcRequest('algo_signTxn', requestParams)

  // send request to bridge
  const result = await connector.sendCustomRequest(request)

  const decodedResult = result.map((element) => {
    return element ? new Uint8Array(Buffer.from(element, 'base64')) : null
  })

  let signedTxn = decodedResult

  let tx = await testNetClient.sendRawTransaction(signedTxn).do()

  let confirmedTxn = await algosdk.waitForConfirmation(
    testNetClient,
    tx.txId,
    4
  )

  if (confirmedTxn) {
    return tx.txId
  } else {
    return null
  }


}



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MetaMaskAddress: '',
      MyAlgoAddress: '',
      // ethersProvider: new ethers.providers.Web3Provider(window.ethereum),
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
    this.setMyAlgoAddress = this.setMyAlgoAddress.bind(this);
  }


  setMyAlgoAddress(addr) {
    this.setState({ MyAlgoAddress: addr })
  }

  render() {
    return (
      <div className="App" >
        <h1>Login example</h1>
        <MyAlgoLogin myAlgoWallet={this.state.myAlgoWallet} setAddress={this.setMyAlgoAddress} />
        <br></br>
        MyAlgo address: {this.state.MyAlgoAddress}
        <br></br>
        <br></br>
        <h1>Purchase example</h1>
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
        <MyAlgoCreateNFT
          addr={this.state.MyAlgoAddress}
        />
      </div>
    );
  }
}

export class MyAlgoLogin extends React.Component {
  constructor(props) {
    super(props);
    this.connect = this.connect.bind(this);
  }

  async connect() {
    try {
      const accounts = await this.props.myAlgoWallet.connect();
      const addresses = accounts.map(account => account.address);
      this.props.setAddress(addresses[0])
      console.log("accounts:", accounts);
      console.log(addresses);
    } catch (err) {
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

    if (from === '') {
      alert("Login with MyAlgo first")
    }
    apiGetAccountBalance()
    apiSubmitTransaction()




    // const params = await this.props.algodClient.getTransactionParams().do();
    // params.fee = algosdk.ALGORAND_MIN_TX_FEE;
    // params.flatFee = true;

    // const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({ 
    //   from: from,
    //   to: to, 
    //   amount: amount,
    //   note: note,
    //   suggestedParams: params
    // });

    // const signedTxn = await this.props.myAlgoWallet.signTransaction(txn.toByte());
    // console.log(signedTxn);
    // const response = await this.props.algodClient.sendRawTransaction(signedTxn.blob).do();
    // console.log(response)
  }

  render() {
    return (
      <button class="purchase-button" id="myalgo-purchase-buttons" onClick={this.purchase}>Buy With MyAlgo</button>
    )
  }
}

export class MyAlgoCreateNFT extends React.Component {
  constructor(props) {
    super(props);
    this.createNFT = this.createNFT.bind(this);
  }

  async createNFT() {
    let midichef_addr = "WBBVOW7LKKTMB2HL4ZLN4W7QFH2DOEYXPZWC6NYNLUJACQP6JL5ZMNS27A";
    const algodClient = new algosdk.Algodv2('',
      'https://node.testnet.algoexplorerapi.io',
      '');
    let params = await algodClient.getTransactionParams().do();
    let defaultFrozen = false;
    let decimals = 0;
    let totalIssuance = 1;
    let unitName = "NFT"
    let note = undefined;
    let assetName = "FirstNFT"
    let hash = undefined;

    let manager = midichef_addr;
    let freeze = midichef_addr;
    let clawback = midichef_addr;
    let reserve = midichef_addr;

    let txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: this.props.addr,
      note: note,
      suggestedParams: params,
      total: totalIssuance,
      decimals: decimals,
      defaultFrozen: defaultFrozen,
      manager: manager,
      reserve: reserve,
      freeze: freeze,
      clawback: clawback,
      unitName: unitName,
      assetName: assetName,
      assetMetadataHash: hash
    });

    let myAlgoWallet = new MyAlgoConnect();
    let signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
    console.log(signedTxn);
    let response = await algodClient.sendRawTransaction(signedTxn.blob).do();
    console.log(response)
  }

  render() {
    return (
      <button class="createasset-button" id="myalgo-createasset-buttons" onClick={this.createNFT}>create NFT</button>
    )
  }
}