import * as React from "react";
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import '../css/Profile.css';
import midicat from '../img/midicat.png'
import "../css/Userbg.css";



export default class Profile extends React.Component {
  render() {
    return (
      <div className="userbg">
        <div className="profile">
          <div >
            <img className="profile-logo" src={midicat} />
          </div>
          <div className="profile-description" style={{ color: 'white' }}>
            MIDIcat <br /><br />
            0x3fF...6b45<br /><br />
            I’m a MIDIcat.<br />
            Here’s a bref description~
          </div>
          <div className="profile-follow" style={{ color: 'white', right: "10px" }}>
            <Button variant="contained">Follow</Button><br />
            <div style={{ color: 'white', display: "inline-block", margin: "15px" }}>7473 Followers</div>
            <div style={{ color: 'white', display: "inline-block" }}>10 Following</div>
          </div>
        </div >
      </div>
    );
  }
}

// ReactDOM.render(<Part4 />, document.getElementById('root'));