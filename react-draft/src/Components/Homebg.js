import React from "react";
import "../css/Homebg.css";
import NavbarUser from "./NavbarUser";

const Homebg = () => {
  return (
    <div className="homebg">
      <nav className="homebar">
        <ul>
          <li>
            <a href="/">TRACKS</a>
          </li>
          <li>
            <a href="/">ARTISTS</a>
          </li>
          <li>
            <a href="/">TRENDING</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Homebg;
