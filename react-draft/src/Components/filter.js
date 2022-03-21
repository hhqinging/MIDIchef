import * as React from "react";
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './profile.css';
import midicat from './midicat.png';


function App() {
  return <Button variant="contained">你好，世界</Button>;
}

export default class SearchBarX extends React.Component {
  render() {
    return (
      <div>
        <Paper
          component="form"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 200 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search tracks and ..."
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        Sort by
        <Stack sx={{ width: 300 }}>
          <FormControlLabel control={<Checkbox />} label="Recently Added" />
          <FormControlLabel control={<Checkbox />} label="MOst Active" />
          <FormControlLabel control={<Checkbox />} label="Most Favorite" />
          <FormControlLabel control={<Checkbox />} label="Price: Low -> High" />
          <FormControlLabel control={<Checkbox />} label="Price: High -> Low" />
        </Stack>

      </div>
    );
  }
}

function Part4() {
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

// ReactDOM.render(<Part4 />, document.getElementById('root'));