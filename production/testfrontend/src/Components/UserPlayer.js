import * as React from "react";
import data from "../data";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import algoicon from "../img/algo.png";
import CardActions from "@mui/material/CardActions";
import AudioPlayer from "material-ui-audio-player";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function UserPlayer() {
  return (
    <div>
      <div style={{ paddingLeft: 180, paddingTop: 50 }}>
        <Grid container style={{ gap: 100, padding: 25, paddingLeft: 150 }}>
          {data.tracks.map((track) => (
            <Card sx={{ maxWidth: 345 }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <a
                  href={`/track/${track.assetID}`}
                  style={{
                    textDecoration: "none",
                    color: "#007acc",
                    fontSize: "large",
                    fontWeight: "bold",
                  }}
                >
                  {track.title}
                </a>
                <br></br>
                <a
                  href={`/user/${track.creator}`}
                  style={{
                    textDecoration: "none",
                    color: "#808080",
                    fontWeight: "bold",
                  }}
                >
                  {track.creator}
                </a>
              </CardContent>
              <a href={`/track/${track.assetID}`}>
                <img width="100%" src={track.img_src} alt={track.title} />
              </a>

              <CardContent>
                <AudioPlayer
                  autoplay={false}
                  preload="auto"
                  loop={false}
                  elevation={0}
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                  // useStyle={useStyles}
                />
              </CardContent>

              <CardActions disableSpacing>
                <img
                  src={algoicon}
                  style={{ width: "20px", padding: 5 }}
                  alt="algo logo"
                />
                <p style={{ fontWeight: "bold" }}>{track.price}</p>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon fontSize="small" />
                </IconButton>
                {track.numFavorite}
                <IconButton aria-label="num of play">
                  <PlayArrowIcon fontSize="medium" />
                </IconButton>
                {track.numPlay}
                <IconButton aria-label="when to release">
                  <CalendarMonthIcon fontSize="small" />
                </IconButton>
                {track.numDay} days ago
              </CardActions>
            </Card>
          ))}
        </Grid>
      </div>
    </div>
  );
}
