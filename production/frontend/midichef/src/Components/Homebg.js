import { fontWeight } from "@mui/system";
import React from "react";
import "../css/Homebg.css";
import NavbarUser from "./NavbarUser";

const Homebg = () => {
  return (
    <div className="homebg">
      <nav className="homebar">
        <ul>
          <li>
            <a href="/Track" style={{ fontWeight: "bold" }}>
              TRACKS
            </a>
          </li>
          <li>
            <a href="/Artists" style={{ fontWeight: "bold" }}>
              ARTISTS
            </a>
          </li>
          <li>
            <a href="/Trending" style={{ fontWeight: "bold" }}>
              TRENDING
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Homebg;
