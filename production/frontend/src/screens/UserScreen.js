import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import MessageBox from "../screens-compo/MessageBox";
import { getError } from "../utils/utils";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

let currentUser = localStorage.getItem("myalgo-wallet-addresses");

const theme = createTheme({
  palette: {
    blue: {
      main: "#59DFDD",
    },
  },
});

//taking two paras: current state & the action that changed current state and create the new state
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, userInfo: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      //return current state
      return state;
  }
};

function UserScreen() {
  const params = useParams();
  const { walletAddr } = params;
  console.log("user", walletAddr);

  const [{ loading, error, userInfo }, dispatch] = useReducer(reducer, {
    userInfo: [],
    loading: true,
    error: "",
  });
  console.log("userInfo", userInfo);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        console.log("user", walletAddr);
        const result = await axios.get(
          `/api/user/get_user?walletAddr=${walletAddr}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [walletAddr]);

  console.log("userInfo50", userInfo);

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
      {/* <br></br>
      <h1 style={{ color: "white" }}>{userInfo.userName}</h1> */}
      <div>
        <img
          src={userInfo.profilePhoto}
          alt={userInfo.userName}
          style={{
            width: "100%",
            height: "200px",
            opacity: "0.4",
          }}
        />
      </div>
      <div>
        <div>
          <img
            src={userInfo.profilePhoto}
            alt={userInfo.userName}
            style={{ width: "250px", height: "250px", borderRadius: "100%" }}
          />
        </div>
        <div>
          <h2 style={{ color: "white" }}>{userInfo.userName}</h2>
          <h3 style={{ color: "white" }}>{userInfo.walletAddr}</h3>
          <h3 style={{ color: "white" }}>{userInfo.description}</h3>
        </div>
        <></>
        <ThemeProvider theme={theme}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to={`/user/${walletAddr}/sales`}>
              <Button
                color="blue"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                {" "}
                Sales
              </Button>{" "}
            </Link>
            <Link to={`/user/${walletAddr}/creation`}>
              {" "}
              <Button
                color="blue"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                {" "}
                Creation
              </Button>{" "}
            </Link>
            <Link to={`/user/${walletAddr}/owned`}>
              {" "}
              <Button
                color="blue"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                {" "}
                Owned NFT
              </Button>{" "}
            </Link>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}
export default UserScreen;
