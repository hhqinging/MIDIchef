import React from "react";

class Forms extends React.Component {
  // constructor(props) {
  //     super(props);
  // }
  state = {
    title: "",
    description: "",
    price: "",
    trackCover: "",
    trackInfo: "",
    Royalty: "",
    aggreeTerm: false,
  };
  handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    // const { title, description, price, trackCover, trackInfo, Royalty } =
    //   this.state;
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            // placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            type="text"
            placeholder="Please describe your track"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="eg: 5 Algo"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>Track Cover </label>
          <input
            name="trackCover"
            type="file"
            placeholder="image cannot exceeds 2M"
            value={this.state.trackCover}
            onChange={this.handleChange}
          />
        </div>
        {/* <fieldset disabled> */}
        <div className="form-group">
          <label>Track Info </label>
          <input
            disabled
            name="trackInfo"
            placeholder={window.location.href}
            value={this.state.trackInfo}
            onChange={this.handleChange}
          />
        </div>
        {/* </fieldset> */}
        <div className="form-group">
          <label>Royalty </label>
          <input
            name="royalty"
            type="number"
            placeholder="eg: 5%, but not exceeds 10%"
            value={this.state.Royalty}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            name="agreeterm"
            checked={this.state.aggreeTerm}
            onChange={(e) => this.setState({ agreeterm: e.target.checked })}
          />
          <label>I agree to the terms and conditions</label>
        </div>
      </form>
    );
  }
}

export default Forms;
