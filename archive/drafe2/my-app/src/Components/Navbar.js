import React from 'react';
import logo from '../img/logo.jpg';
// import "../css/Naivebar.css";
import '../css/Navbar.css';
import Create from '../pages/Create';
import User from '../pages/User';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';



const Navbar = (props) => {
  //   <header className="naivebar">
  return (
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
        <li className="Sign">
          <a href="/">
            <strong>Sign In</strong>
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
