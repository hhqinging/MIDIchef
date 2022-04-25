import React from "react";
import Homebg from "../Components/Homebg";
import HomePlayer from "../Components/HomePlayer";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Homebg />
      <HomePlayer />

      <div class="ui labeled button" tabindex="0">
        <div class="ui button">
          <i class="heart icon"></i> Like
        </div>
        <a class="ui basic label">2,048</a>
      </div>
    </div>
  );
};

export default Home;
