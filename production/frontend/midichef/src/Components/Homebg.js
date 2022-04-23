import React from "react";
import "../css/Homebg.css";
import NavbarUser from "./NavbarUser";

const Homebg = () => {
  return (
    <div className="homebg">
      <nav className="homebar">
        <ul>
          <li>
            <a href="/Track">TRACKS</a>
          </li>
          <li>
            <a href="/Artists">ARTISTS</a>
          </li>
          <li>
            <a href="/Trending">TRENDING</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Homebg;
