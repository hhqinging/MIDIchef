import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import TrackPlayer from "../screens-compo/TrackPlayer";
import { useParams } from "react-router-dom";
import { getError } from "../utils/utils";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MessageBox from "../screens-compo/MessageBox";

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

const reducerforUser = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loadingUser: true };
    case "FETCH_SUCCESS":
      return { ...state, userInfo: action.payload, loadingUser: false };
    case "FETCH_FAIL":
      return { ...state, loadingUser: false, errorUser: action.payload };
    default:
      return state;
  }
};

function UserSales() {
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

  const params = useParams();
  const { user } = params;
  console.log("user", user);

  const [{ loadingUser, errorUser, userInfo }, dispatchUser] = useReducer(
    reducerforUser,
    {
      userInfo: [],
      loading: true,
      error: "",
    }
  );
  console.log("userInfo", userInfo);

  useEffect(() => {
    const fetchData = async () => {
      dispatchUser({ type: "FETCH_REQUEST" });
      try {
        console.log("user", user);
        const result = await axios.get(`/api/user/get_user?userName=${user}`);
        dispatchUser({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatchUser({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [user]);

  console.log("preFilterTrack", tracks);

  console.log("user", user);

  const salesTracks = tracks.filter(
    (track) => track.owner === user && track.marketStatus === true
  );

  console.log("selling tracks", salesTracks);

  return (
    <div>
      <h1 style={{ color: "white" }}>{user} Selling Songs</h1>
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
            salesTracks.map((track) => (
              <Card
                style={{
                  marginTop: "1%",
                  marginBottom: "1%",
                  marginRight: "0.5%",
                  marginLeft: "0.5%",
                }}
                sx={{ maxWidth: 345 }}
                key={salesTracks.assetID}
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
export default UserSales;
