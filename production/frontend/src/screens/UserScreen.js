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
      //it happens when sending axios req to backend
      //...state: return newest state,
      //keep prev state val and only update when loading: true
      //loading :true, we can show loading to ui
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      //keep prev state val, and only update tracks the data that coming from action, the data in action is in action.payload
      //action.payload contains all tracks from backend,
      //and we need to update loading to false since we success fetch data to frontend, no need tp show loading
      return { ...state, user: action.payload, loading: false };
    case "FETCH_FAIL":
      //return prev state, and set loading to false[not show loading], and fail the error in the action.payload
      return { ...state, loading: false, error: action.payload };
    default:
      //return current state
      return state;
  }
};

function UserScreen() {
  const params = useParams();
  const { userName } = params;

  const [{ loading, error, user }, dispatch] = useReducer(reducer, {
    userName: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `/api/user/get_user?userName=${userName}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [userName]);

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
      <h1>{}</h1>
      <div>
        <img
          src={user.profilePhoto}
          alt={user.userName}
          backdropFilter="blur(200px)"
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
            src={user.profilePhoto}
            alt={user.userName}
            style={{ width: "250px", height: "250px", borderRadius: "100%" }}
          />
        </div>
        <div>
          <h1>{user.userName}</h1>
          <h2>{user.walletAddr}</h2>
          <h2>{user.description}</h2>
        </div>
      </div>
    </div>
  );
}
export default UserScreen;
