// import React from 'react';
import * as React from 'react';
import logo from '../img/logo.jpg';
// import "../css/Naivebar.css";
import '../css/Navbar.css';
import Create from '../pages/Create';
import User from '../pages/User';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as MyAlgo from 'MyAlgo';
import * as MetaMask from 'MetaMask'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';


const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //   <header className="naivebar">
  return (
    <div>
      <nav className="naivebar-n">
        <a className="logo-href" href="#">
          <img className="logo" src={logo} />
        </a>
        <a className="MIDIchef" href="#">
          MIDIchef
        </a>

        <form
          className="search-bar"
          action="/search"
          autocomplete="off"
          method="get"
        >
          <input
            type="text"
            placeholder="Search tracks, collections, and artists..."
          />
        </form>
        <ul className="urlbar">
          <li>
            <a href="/">Explore</a>
          </li>
          <li>
            {/* <a href="/Create">Create</a> */}
            <NavLink
              to="/Create"
              activeClassName="selected">
              Create
            </NavLink>
          </li>
          <li>
            {/* <a href="/">Kitchen</a> */}
            <NavLink
              to="/User"
              activeClassName="selected">
              Kitchen
            </NavLink>
          </li>
          {/* <li className="Sign">
          <NavLink
            to="/User"
            activeClassName="selected">
            Sign In
          </NavLink>
        </li> */}
          <li>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Sign in
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Algo</MenuItem>
                {/* <MyAlgoLogin myAlgoWallet={this.state.myAlgoWallet} setAddress={this.setMyAlgoAddress} /> */}
                <MenuItem onClick={handleClose}>Eth</MenuItem>
                {/* <MetaMaskLogin provider={this.state.ethersProvider} setAddress={this.setMetaMaskAddress} /> */}
              </Menu>
          </li>
        </ul>
      </nav>
      
    </div>
  );
};
export default Navbar;
