import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import MessageBox from "../screens-compo/MessageBox";
import { getError } from "../utils/utils";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    blue: {
      // Purple and green play nicely together.
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

function ProfileScreen() {
  let currentUser = localStorage.getItem("myalgo-wallet-addresses");
  // const params = useParams();
  // const { currentUser } = params;
  console.log("user", currentUser);

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
        console.log("user", currentUser);
        const result = await axios.get(
          `/api/user/get_user?walletAddr=${currentUser}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [currentUser]);

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
  
      <div>
        <div>
          <img
            src={userInfo.profilePhoto}
            alt={userInfo.userName}
            style={{ width: "250px", height: "250px", borderRadius: "100%", padding: "3%" }}
          />
        </div>
        <div>
          <h1 style={{ color: "white" }}>{userInfo.userName}</h1>
          <h2 style={{ color: "white" }}>{userInfo.description}</h2>
        </div>
        <></>
        <ThemeProvider theme={theme}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to={`/profile/sales`}>
              <Button
                color="blue"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                {" "}
                Sales
              </Button>{" "}
            </Link>
            <Link to={`/profile/creation`}>
              {" "}
              <Button
                color="blue"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                {" "}
                Creation
              </Button>{" "}
            </Link>
            <Link to={`/profile/owned`}>
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
export default ProfileScreen;
