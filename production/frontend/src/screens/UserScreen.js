import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import MessageBox from "../screens-compo/MessageBox";
import { getError } from "../utils/utils";
let currentUser = localStorage.getItem("myalgo-wallet-addresses");

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
      <h1 style={{ color: "white" }}>{userInfo.userName}</h1>
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
          <h1 style={{ color: "white" }}>{userInfo.userName}</h1>
          <h2 style={{ color: "white" }}>{userInfo.walletAddr}</h2>
          <h2 style={{ color: "white" }}>{userInfo.description}</h2>
        </div>
      </div>
    </div>
  );
}
export default UserScreen;
