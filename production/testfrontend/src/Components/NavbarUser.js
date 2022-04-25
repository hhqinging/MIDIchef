import React from "react";
import "../css/NavbarUser.css";


const NavbarUser = (props) => {
  return (
  
      <div className="naivebaruser">
        <nav className="naivebar_user">
          <ul className="userbar_1">
            <li>
              <a href="/User">
              {/* (songs selling in the market, including songs bought from others) */}
                <strong>SALES</strong>
              </a>
            </li>
            <li>
              <a href="/User">
              {/* (all songs create by user) */}
                <strong>CREATIONS</strong>
              </a>
            </li>
            <li>
              <a href="/User">
              {/* (songs hold on hand, including song created &bought, show only[no price], pending for updating price to sell) */}
                <strong>OWNED</strong>
              </a>
            </li>
            <li>
              <a href="/User">
                <strong>FAVORITED</strong>
              </a>
            </li>
          </ul>
        </nav>
      </div>

  

  );
};
export default NavbarUser;
