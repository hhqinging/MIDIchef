import React from "react";
import "../css/NavbarUser.css";
const NavbarUser = (props) => {
  return (
  
      <div className="naivebaruser">
        <nav className="naivebar_user">
          <ul className="userbar_1">
            <li>
              <a href="/User">
                <strong>CREATED</strong>
              </a>
            </li>
            <li>
              <a href="/User">
                <strong>COLLECTED</strong>
              </a>
            </li>
            <li>
              <a href="/User">
                <strong>FAVORITED</strong>
              </a>
            </li>
            <li>
              <a href="/User">
                <strong>NETWORK</strong>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      // {/* <div className="naivebaruser_sub">
      //   <nav className="naivebar_user_sub">
      //     <ul className="userbar_sub_1">
      //       <li>
      //         <a href="/">POSTED</a>
      //       </li>
      //       <li>
      //         <a href="/">SOLD</a>
      //       </li>
      //       <li>
      //         <a href="/">DRAFT</a>
      //       </li>
      //     </ul>
      //   </nav>
      // </div> */}
  

  );
};
export default NavbarUser;
