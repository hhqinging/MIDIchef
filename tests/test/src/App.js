
import React from "react";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import algosdk from 'algosdk';


export default class App extends React.Component  {
	constructor(props) {
		super(props);
		this.state = {username: '', email:'', text:'', 
			myAlgoWallet: new MyAlgoConnect(),
			algodClient: new algosdk.Algodv2(
				'', 
				'https://node.testnet.algoexplorerapi.io', 
				'')
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleMyAlgoConnect = this.handleMyAlgoConnect.bind(this);
		this.handleSend = this.handleSend.bind(this);
	}
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	
	handleSubmit(event) { 
    alert (JSON.stringify(this.state))
    fetch('http://localhost:8000/api', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode:'cors',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(this.state) // body data type must match "Content-Type" header
    });
  
		event.preventDefault();
	}

	async handleMyAlgoConnect() {
		try {
			const accounts = await this.state.myAlgoWallet.connect();
			const addresses = accounts.map(account => account.address);
			console.log(accounts)
			console.log(addresses)

		} catch (err) {
			console.error(err);
		}
	}

	async handleSend() {
		try {
			const sender = "WBBVOW7LKKTMB2HL4ZLN4W7QFH2DOEYXPZWC6NYNLUJACQP6JL5ZMNS27A"
			const receiver = "WPOR3WN7SWWPGNXXLLCHNBJ4ALOI6TOCXSFN6RZ6EXFSPXOU2RKQHOAFC4"
			const amount = 1000000

			const enc = new TextEncoder();
        	const note = enc.encode("Test Send");
			const params = await this.state.algodClient.getTransactionParams().do();
			params.fee = algosdk.ALGORAND_MIN_TX_FEE;
        	params.flatFee = true;

			const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({ 
				from: sender,
				to: receiver, 
				amount: amount,
				note: note,
				suggestedParams: params
			});
			const signedTxn = await this.state.myAlgoWallet.signTransaction(txn.toByte());
			console.log(signedTxn);
			const response = await this.state.algodClient.sendRawTransaction(signedTxn.blob).do();
			console.log(response)
		} catch(err) {
			console.error(err); 
		}
	}

	render(){
		return (
			<div>
				<button onClick={this.handleMyAlgoConnect}> MyAlgo Connect</button>
				<button onClick={this.handleSend}>Send Algo</button>
			</div>
		// <div className="addcontainer">
		// <div style={{display: 'flex', justifyContent: 'center'}}>
		// <h4>Add new task here:</h4>
		// </div>
		// <form onSubmit={this.handleSubmit}>
		// <div className="wrapper">
		// 	<label for="username"><b>Username</b></label>
		// 	<input type="text" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} placeholder="Enter Username" name="uname" required />
		// 	<label for="email"><b>Email</b></label>
		// 	<input type="text" value={this.state.password} onChange={e => this.setState({ email: e.target.value })} placeholder="Enter Email" name="email" required />
		// 	<label for="text"><b>Text</b></label>
		// 	<input type="text" value={this.state.password} onChange={e => this.setState({ text: e.target.value })} placeholder="Enter Task" name="text" required />
		// 	<button className="login" type="submit">Add task</button>	
		// </div>
		// </form>
		// </div>
		)
	}
}