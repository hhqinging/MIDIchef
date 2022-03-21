import React from "react";
import logo from "../img/logo.jpg";
// import "../css/Naivebar.css";
import "../css/navbar.css";
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
          <a href="/">Create</a>
        </li>
        <li>
          <a href="/">Kitchen</a>
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
