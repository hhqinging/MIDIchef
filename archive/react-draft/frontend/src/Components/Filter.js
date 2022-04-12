import React from 'react';
import ReactDOM from 'react-dom';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../css/Filter.css';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default class Filter extends React.Component {
  render() {
    return (
      <div className="filter">
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

        <p style={{ color: 'white' }}>Sort by</p>
        {/* <Stack sx={{ width: 300 , color: "white"}}>
          <FormControlLabel control={<Checkbox `sx={{color: "white"}}`/>} label="Recently Added" />
          <FormControlLabel control={<Checkbox sx={{color: "white"}}/>} label="MOst Active" />
          <FormControlLabel control={<Checkbox sx={{color: "white"}}/>} label="Most Favorite" />
          <FormControlLabel control={<Checkbox sx={{color: "white"}}/>} label="Price: Low -> High" />
          <FormControlLabel control={<Checkbox sx={{color: "white"}}/>} label="Price: High -> Low" />
        </Stack> */}
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Recently Added"
            name="radio-buttons-group"
            sx={{ color: "white" }}
          >
            <FormControlLabel value="Recently Added" control={<Radio sx={{ color: "white" }} />} label="Recently Added" />
            <FormControlLabel value="Most Active" control={<Radio sx={{ color: "white" }} />} label="Most Active" />
            <FormControlLabel value="Most Favorite" control={<Radio sx={{ color: "white" }} />} label="Most Favorite" />
            <FormControlLabel value="Price: Low -> High" control={<Radio sx={{ color: "white" }} />} label="Price: Low -> High" />
            <FormControlLabel value="Price: High -> Low" control={<Radio sx={{ color: "white" }} />} label="Price: High -> Low" />
          </RadioGroup>
        </FormControl>

      </div>
    );
  }
}