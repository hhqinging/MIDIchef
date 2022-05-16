import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import MessageBox from "../screens-compo/MessageBox";
import { getError } from "../utils/utils";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";
import "./profileScreen.css"

import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    blue: {
      main: "#59DFDD",
    },
  },
});

const StyledButton = withStyles({
  root: {
    textDecoration: "none",
    color: "#59DFDD",
    '&:hover': {
      color: "#e785e7",
    }
  }
})(Button);

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
  const { user } = params;
  console.log("user", user);

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
        console.log("user", user);
        const result = await axios.get(`/api/user/get_user?userName=${user}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [user]);

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
      <div class="row">
        <div class="column">
          <div class="pfp">
            <img
              src={userInfo.profilePhoto}
              alt={userInfo.userName}
            />
          </div>
          
          <div>
            <div class="userName">{userInfo.userName}</div>
            <div class="description">{userInfo.description}</div>
          </div>
        </div>
        <></>
        <div class="column">
          <ThemeProvider theme={theme}>
            <div class="tracks-container">
              <Link to={`/user/${user}/sales`}>
                <StyledButton
                  color="blue"
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  {" "}
                  Sales
                </StyledButton>{" "}
              </Link>
              <Link to={`/user/${user}/creation`}>
                {" "}
                <StyledButton
                  color="blue"
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  {" "}
                  Creations
                </StyledButton>{" "}
              </Link>
              <Link to={`/user/${user}/owned`}>
                {" "}
                <StyledButton
                  color="blue"
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  {" "}
                  Owned Tracks
                </StyledButton>{" "}
              </Link>
            </div>
          </ThemeProvider>
        </div>
      </div>
  );
}
export default UserScreen;
