import * as React from "react";
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import '../css/profile.css';
import midicat from '../img/midicat.png'



export default class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        <div >
          <img className="profile-logo" src={midicat} />
        </div>
        <div className="profile-description">
          MIDIcat <br /><br />
          0x3fF...6b45<br /><br />
          I’m a MIDIcat.<br />
          Here’s a bref description~
        </div>
        <div className="profile-follow">
          <Button variant="contained">Follow</Button><br />
          7473 Followers      10 Following
        </div>
      </div >
    );
  }
}

// ReactDOM.render(<Part4 />, document.getElementById('root'));