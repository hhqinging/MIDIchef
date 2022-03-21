import React from "react";
import Homebg from "../Components/Homebg";
import HomePlayer from "../Components/HomePlayer";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Homebg />
      <HomePlayer />
    </div>
  );
};

export default Home;
