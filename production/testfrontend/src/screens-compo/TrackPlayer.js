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

function TrackPlayer(props) {
  const { track } = props;

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
          <img width="100%" src={track.img_src} alt={track.title} />
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
          <img
            src={algoicon}
            style={{ width: "20px", padding: 5 }}
            alt={track.title}
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
    </div>
  );
}
export default TrackPlayer;
