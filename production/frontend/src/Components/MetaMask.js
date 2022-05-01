import React from "react";
import { ethers } from "ethers";

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