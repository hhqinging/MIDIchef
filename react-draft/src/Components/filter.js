import React from 'react';
import ReactDOM from 'react-dom';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default class Filter extends React.Component {
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