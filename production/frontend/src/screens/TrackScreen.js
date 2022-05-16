import { useParams, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { CircularProgress, Grid, Stack, Button } from "@mui/material";
import MessageBox from "../screens-compo/MessageBox";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import algoicon from "../img/algoicon.png";
import AudioPlayer from "material-ui-audio-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { getError } from "../utils/utils";
import { withStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

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

const theme = createTheme({
  palette: {
    blue: {
      main: "#59DFDD",
      contrastText: "#000000",
    },
    pink: {
      main: "#e785e7",
      contrastText: "#000000",
    },
  },
});

const StyledButton = withStyles({
  root: {
    color: "black",
    "&:hover": {
      backgroundColor: "#e785e7",
    },
  },
})(Button);

function TrackScreen() {
  const params = useParams();
  const { assetID } = params;

  console.log("assetID", assetID);

  const [{ loading, error, track }, dispatch] = useReducer(reducer, {
    track: [],
    loading: true,
    error: "",
  });
  const [numFavorite, setNumFavorite] = useState(track.numFavorite);
  const [favorite, setFavorite] = useState(false);

  let onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!favorite) {
      setFavorite(true);
      console.log(favorite);
      console.log("ori :", numFavorite);
      setNumFavorite(track.numFavorite + 1);
      track.numFavorite++;
      console.log("after:", numFavorite);
      console.log("after track:", track.numFavorite);
      formData.append("numFavorite", numFavorite + 1);
    } else {
      setFavorite(false);
      console.log(favorite);
      console.log("ori :", numFavorite);
      setNumFavorite(track.numFavorite - 1);
      track.numFavorite--;
      console.log("after:", numFavorite);
      console.log("after track:", track.numFavorite);
      formData.append("numFavorite", numFavorite - 1);
    }

    formData.append("assetID", track.assetID);
    // console.log(formData.getAll("numFavorite"))
    axios
      .post("http://47.252.29.19:8000/api/addNumFavorite", formData, {})
      .then((res) => {
        console.log("numFavoriteSend:", res.data.numFavorite);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const [tracks, setTracks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios.get("/api/tracks");
      // setTracks(result.data);
      //before send the axios, use dispatch to update the state, set loading to true
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `/api/tracks/single_song?assetID=${assetID}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        // dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [assetID]);

  console.log("trackinfo", track);

  const currentAddr = localStorage.getItem("myalgo-wallet-addresses");
  console.log("currentAddr ", currentAddr);
  console.log("assetID", assetID);

  const navigate = useNavigate();
  const handleClick = async () => {
    const walletAddr = localStorage.getItem("myalgo-wallet-addresses");
    try {
      axios
        .post(`http://47.252.29.19:8000/api/tracks/buy_it`, {
          walletAddr,
          assetID,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert("Succeed to buy");
            navigate("/profile/owned");
          } else {
            alert("failed to buy");
          }
        });
      console.log("checjhuahfiashfi");
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <CircularProgress
      style={{
        padding: "2% 45% 2% 45%",
      }}
    />
  ) : error ? (
    <MessageBox severity="error">{error}</MessageBox>
  ) : (
    <div>
      <br></br>
      <Grid container style={{ paddingLeft: "10%" }}>
        {/* <Grid container sx={{ p: 10, margin: "auto", flexGrow: 1 }}> */}
        <Grid container direction="row" spacing={5}>
          <Grid item xs={5} style={{ maxWidth: "700px", maxHeight: "700px" }}>
            <img
              style={{
                margin: "auto",
                display: "block",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              src={track.img_src}
              alt={track.title}
            />
          </Grid>
          <Grid item xs={7}>
            <p style={{ color: "white", fontSize: "35px", fontWeight: "bold" }}>
              {track.title}
            </p>
            <p style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
              Owned by{" "}
              <Link
                to={`/user/${track.owner}`}
                style={{ textDecoration: "none", color: "#59DFDD" }}
              >
                {track.owner}
              </Link>
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <FavoriteIcon
                fontSize="small"
                style={{ margin: "0px 9px 0px 5px" }}
              />
              {track.numFavorite} Favorited
            </p>
            {/* <p
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <PlayArrowIcon style={{ width: "24px", marginRight: "2px", }} />
              Played {track.numPlay} times
            </p> */}

            <p
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <img
                src={algoicon}
                style={{
                  width: "18px",
                  margin: "0px 5px 0px 3px",
                  border: "1px solid white",
                  borderRadius: "100%",
                  padding: "2px",
                }}
                alt={algoicon}
              />
              {track.price} Algo
            </p>
            <br></br>
            <ThemeProvider theme={theme}>
              <AudioPlayer
                // volume={false}
                preload="auto"
                loop={false}
                elevation={0}
                src={track.src}
                width="60%"
              />
            </ThemeProvider>
            <br></br>
            <br></br>
            <Stack direction="row" spacing={2}>
              {track.marketStatus === true ? (
                <ThemeProvider theme={theme}>
                  <StyledButton
                    onClick={handleClick}
                    variant="contained"
                    color="blue"
                    style={{ fontWeight: "bold" }}
                  >
                    Buy Now
                  </StyledButton>
                  {/* <form onSubmit={onSubmit}>
                    <StyledButton variant="contained" color="blue" style={{ fontWeight: "bold" }}>
                      Add to Favorites
                    </StyledButton>
                  </form> */}
                </ThemeProvider>
              ) : (
                <ThemeProvider theme={theme}>
                  {/* <form onSubmit={onSubmit}>
                    <StyledButton variant="contained" color="blue" style={{ fontWeight: "bold" }}>
                      Add to Favorites
                    </StyledButton>
                  </form> */}
                </ThemeProvider>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <p style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
              Created by{" "}
              <Link
                to={`/user/${track.creator}`}
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "#59DFDD",
                  fontSize: "20px",
                }}
              >
                {track.creator}
              </Link>
            </p>
            <p
              style={{
                color: "#e785e7",
                fontSize: "15px",
                fontWeight: "bold",
                margin: "0px 0px 0px 0px",
              }}
            >
              Description
            </p>
            <p
              style={{
                color: "white",
                fontSize: "15px",
                fontWeight: "bold",
                margin: "0px 0px 50px 0px",
              }}
            >
              {track.description}
            </p>

            <p
              style={{
                color: "white",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              Detail info in{" "}
              <a
                href={`https://testnet.algoexplorer.io/asset/${track.assetID}`}
                style={{ textDecoration: "none" }}
              >
                algoexplorer.io
              </a>
            </p>
          </Grid>
          <Grid item xs={7}>
            <p
              style={{
                color: "white",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              Activity info pending
            </p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default TrackScreen;
