import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import algoicon from "../img/algoicon.png";
import AudioPlayer from "material-ui-audio-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

//taking two paras: current state & the action that changed current state and create the new state
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      //it happens when sending axios req to backend
      //...state: return newest state,
      //keep prev state val and only update when loading: true
      //loading :true, we can show loading to ui
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      //keep prev state val, and only update tracks the data that coming from action, the data in action is in action.payload
      //action.payload contains all tracks from backend,
      //and we need to update loading to false since we success fetch data to frontend, no need tp show loading
      return { ...state, track: action.payload, loading: false };
    case "FETCH_FAIL":
      //return prev state, and set loading to false[not show loading], and fail the error in the action.payload
      return { ...state, loading: false, error: action.payload };
    default:
      //return current state
      return state;
  }
};

function TrackScreen() {
  const params = useParams();
  const { assetID } = params;

  const [{ loading, error, track }, dispatch] = useReducer(reducer, {
    track: [],
    loading: true,
    error: "",
  });

  // const [tracks, setTracks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios.get("/api/tracks");
      // setTracks(result.data);
      //before send the axios, use dispatch to update the state, set loading to true
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/tracks/assetID/${assetID}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [assetID]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <br></br>

      <Grid container style={{ gap: 20, padding: 25, paddingLeft: 150 }}>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={5}>
            <img
              style={{ width: "300px", height: "300px" }}
              src={track.img_src}
              alt={track.title}
            />
          </Grid>
          <Grid item>
            <p>{track.title}</p>
            <p>
              Owned by{" "}
              <Link
                to={`/user/${track.owner}`}
                style={{ textDecoration: "none" }}
              >
                {track.owner}
              </Link>
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <FavoriteIcon
                fontSize="small"
                style={{ margin: "0px 5px 0px 0px" }}
              />
              {track.numFavorite} Favorited
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <PlayArrowIcon style={{ width: "24px" }} />
              {track.numPlay} Play times
            </p>

            <p
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <img
                src={algoicon}
                style={{ width: "18px", margin: "0px 5px 0px 0px" }}
                alt={algoicon}
              />
              {track.price} Algo
            </p>
            <AudioPlayer
              volume={false}
              preload="auto"
              loop={false}
              elevation={0}
              src={track.src}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={5}>
            <p>creator info</p>
          </Grid>
          <Grid item>
            <p>transaction table</p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default TrackScreen;
