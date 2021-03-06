import { Link } from "react-router-dom";
import algoicon from "../img/algoicon.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AudioPlayer from "material-ui-audio-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axios from 'axios';
import React, { useState } from 'react';

function TrackPlayer(props) {
  const { track } = props;
  const [numFavorite, setNumFavorite] = useState(track.numFavorite);
  const [favorite, setFavorite] = useState(false);

  let onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!favorite) {
      setFavorite(true);
      setNumFavorite(track.numFavorite + 1);
      track.numFavorite++;
      formData.append('numFavorite', numFavorite + 1)
    } else {
      setFavorite(false);
      setNumFavorite(track.numFavorite - 1);
      track.numFavorite--;
      formData.append('numFavorite', numFavorite - 1)
    }

    formData.append('assetID', track.assetID)
    axios.post("http://47.252.29.19:8000/api/addNumFavorite", formData, {
    }).then(res => {
      // console.log("numFavoriteSend:", res.data.numFavorite)
    })
      .catch(err => {
        // console.log(err)
      })
  }


  return (
    <div>
      <Card>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Link
            to={`/track/${track.assetID}`}
            style={{
              textDecoration: "none",
              color: "#007acc",
              fontSize: "large",
              fontWeight: "bold",
            }}
          >
            {track.title}
          </Link>
          <br></br>
          <Link
            to={`/user/${track.creator}`}
            style={{
              textDecoration: "none",
              color: "#808080",
              fontWeight: "bold",
            }}
          >
            {track.creator}
          </Link>
        </CardContent>
        <Link to={`/track/${track.assetID}`}>
          <img style={{
            height: 350,
            width: 350,
            objectFit: "fill",
            objectFit: "cover"
          }} src={track.img_src} alt={track.title} />
        </Link>

        <CardContent>
          <AudioPlayer
            autoplay={false}
            preload="auto"
            loop={false}
            elevation={0}
            src={track.src}
          // useStyle={useStyles}
          />
        </CardContent>

        <CardActions disableSpacing>
          {/* Algo Icon and Price */}
          <div style={{ fontWeight: "bold", display: "flex" }}>
            <img
              src={algoicon}
              style={{ width: "35px", padding: "0px 10px 0px 10px" }}
              alt={track.title}
            />
            <div style={{ paddingTop: "5px", }}>
              {track.price}
            </div>
          </div>

          {/* Favorites Icon and Num */}
          <div style={{
            textDecoration: "none",
            color: "#808080",
            fontWeight: "bold",
            margin: "auto",
          }}>
            <form onSubmit={onSubmit}>
              <IconButton aria-label="add to favorites" type="submit">
                <FavoriteIcon fontSize="large" fontWeight="bold" />
              </IconButton>
              {track.numFavorite}
            </form>
          </div>
          {/* <IconButton aria-label="num of play">
            <PlayArrowIcon fontSize="medium" />
          </IconButton>
          {track.numPlay}
          <IconButton aria-label="when to release">
            <CalendarMonthIcon fontSize="small" />
          </IconButton>
          {track.numDay} days ago */}
        </CardActions>
      </Card>
    </div>
  );
}
export default TrackPlayer;
