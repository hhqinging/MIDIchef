import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import TrackPlayer from "../screens-compo/TrackPlayer";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MessageBox from "../screens-compo/MessageBox";

//taking two paras: current state & the action that changed current state and create the new state
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, tracks: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OwnedTracks() {
  // let currentUser = localStorage.getItem("myalgo-wallet-addresses");

  // const [{ loading, error, tracks }, dispatch] = useReducer(logger(reducer), {
  //     tracks: [],
  //     loading: true,
  //     error: "",
  // });
  // console.log("TRACKS1", tracks);
  let currentAddr = localStorage.getItem("myalgo-wallet-addresses");
  let currentU;
  try {
    axios.get(`/api/user/get_user?walletAddr=${currentAddr}`).then((result) => {
      currentU = result.data.userName;
      localStorage.setItem("username", currentU);
    });
  } catch (error) {
    console.log(error);
  }

  //   const currentUser = currentUserProm.data.userName;
  let currentUser = localStorage.getItem("username");
  localStorage.removeItem("username");
  console.log(currentUser);
  const [{ loading, error, tracks }, dispatch] = useReducer(logger(reducer), {
    tracks: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/tracks/songlist");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  console.log("USER: ", currentUser);

  const filteredTracks = tracks.filter((track) => track.owner === currentUser);
  console.log("TRACKS2", filteredTracks);

  return (
    <div>
      <h1 style={{ color: "white" }}>Your owned NFT tracks</h1>
      <div className="tracks">
        <Grid
          container
          style={{
            display: "flex",
            width: "92%",
            margin: "auto",
            justifyContent: "space-evenly",
            spacing: "2",
          }}
        >
          {loading ? (
            <CircularProgress
              style={{
                padding: "2% 45% 2% 45%",
              }}
            />
          ) : error ? (
            <MessageBox severity="error">{error}</MessageBox>
          ) : (
            filteredTracks.map((track) => (
              <Card
                style={{
                  marginTop: "1%",
                  marginBottom: "1%",
                  marginRight: "0.5%",
                  marginLeft: "0.5%",
                }}
                sx={{ maxWidth: 345 }}
                key={track.assetID}
              >
                <TrackPlayer track={track}></TrackPlayer>
              </Card>
            ))
          )}
        </Grid>
      </div>
    </div>
  );
}
export default OwnedTracks;
