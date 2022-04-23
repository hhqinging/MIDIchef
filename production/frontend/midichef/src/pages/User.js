import React from "react";
import Navbar from "../Components/Navbar";
import Userbg from "../Components/Userbg";
import Filter from "../Components/Filter";
import Profile from "../Components/Profile";
import NavbarUser from "../Components/NavbarUser";
import UserPlayer from "../Components/UserPlayer";



const User = () => {

  return (
    <div>
      <Filter />


      {/* <Navbar /> */}
      <Profile />
      <NavbarUser />
      {/* <Userbg /> */}

      <UserPlayer />

    </div>
  );
};

export default User;
