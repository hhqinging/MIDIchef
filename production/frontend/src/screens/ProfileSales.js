import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import TrackPlayer from "../screens-compo/TrackPlayer";
// import data from "../data";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MessageBox from "../screens-compo/MessageBox";

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
      return { ...state, tracks: action.payload, loading: false };
    case "FETCH_FAIL":
      //return prev state, and set loading to false[not show loading], and fail the error in the action.payload
      return { ...state, loading: false, error: action.payload };
    default:
      //return current state
      return state;
  }
};

function ProfileSales() {
  let currentAddr = localStorage.getItem("myalgo-wallet-addresses");
  let currentU;
  const currentUserProm = axios
    .get(`/api/user/get_user?walletAddr=${currentAddr}`)
    .then((result) => {currentU = result.data;console.log(currentU)});

  //   const currentUser = currentUserProm.data.userName;

  console.log("currentUser:", currentUserProm);
  console.log("currentU:", currentU);

  const [{ loading, error, tracks }, dispatch] = useReducer(logger(reducer), {
    tracks: [],
    loading: true,
    error: "",
  });

  // console.log("preFilter", tracks);

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

  // const salesTracks = tracks.filter(
  //   (track) => track.owner === currentUser && track.marketStatus === true
  // );
  // console.log("selling tracks", salesTracks);

  return (
    <div>
      <h1 style={{ color: "white" }}> Selling Songs</h1>
      <div className="tracks">
        {/* <Grid
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
            salesTracks.map((track) => (
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
        </Grid> */}
      </div>
    </div>
  );
}
export default ProfileSales;
