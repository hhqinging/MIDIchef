import React from "react";
import Navbar from "../Components/Navbar";
import Userbg from "../Components/Userbg";
import Filter from "../Components/Filter";
import Profile from "../Components/Profile";


const User = () => {
  return (
    <div>
      <Navbar />
      <Profile />
      {/* <Userbg /> */}
      <Filter />
    </div>
  );
};

export default User;
