import React from "react";
import "../css/Homeplayer.css";
import picture from "../img/sign.jpeg";
import play from "../img/play.png";
import algo from "../img/algo.png";
import heart from "../img/heart.png";
import play1 from "../img/play1.png";
import edit from "../img/edit.png";

const Homeplayer = (props) => (
  <div className="main-musicgeneral">
    <img src={picture} className="table_background" alt="" />
    <div className="table_mainplayer">
      <div className="display_bar">
        <div className="title_main">
          <strong>SIGN</strong>
        </div>
        <div className="creater_main">MIDIcat</div>
      </div>
      <div className="playbar">
        <div>
          <img src={play} className="play" alt="" />
        </div>
        <div className="time">
          <strong>00:35</strong>
        </div>
        <img src={algo} className="algo" alt="" />
        <div className="price">
          <strong>1 Algo</strong>
        </div>
      </div>
      <div>
        <div className="music_detail">
          <div>
            <img src={heart} className="heart" alt="" />
          </div>
          <div className="music_info">300</div>
          <div>
            <img src={play1} className="play1" alt="" />
          </div>
          <div className="music_info">7000</div>
          <div>
            <img src={edit} className="edit" alt="" />
          </div>
          <div className="music_info">7 days ago</div>
        </div>
      </div>
    </div>
  </div>
);
export default Homeplayer;
