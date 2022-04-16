
import React from "react";


export default class App extends React.Component  {
	constructor(props) {
		super(props);
		this.state = {username: '', email:'', text:''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
	render(){
		return (
		<div className="addcontainer">
		<div style={{display: 'flex', justifyContent: 'center'}}>
		<h4>Add new task here:</h4>
		</div>
		<form onSubmit={this.handleSubmit}>
		<div className="wrapper">
			<label for="username"><b>Username</b></label>
			<input type="text" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} placeholder="Enter Username" name="uname" required />
			<label for="email"><b>Email</b></label>
			<input type="text" value={this.state.password} onChange={e => this.setState({ email: e.target.value })} placeholder="Enter Email" name="email" required />
			<label for="text"><b>Text</b></label>
			<input type="text" value={this.state.password} onChange={e => this.setState({ text: e.target.value })} placeholder="Enter Task" name="text" required />
			<button className="login" type="submit">Add task</button>	
		</div>
		</form>
		</div>
		)
	}
}