import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NarBar from "./screens-compo/Narbar";
import CreateScreen from "./screens/CreateScreen";
import HomeScreen from "./screens/HomeScreen";
import TrackScreen from "./screens/TrackScreen";
import UserScreen from "./screens/UserScreen";
import AuthScreen from "./screens/AuthScreen";
import UpdateProfile from "./screens/updateProfile";
import "./App.css";
import { isLogin } from "./screens-compo/MyAlgo";
import { Navigate } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <NarBar />
        <main>
          <Routes>
            <Route path="/create" element={<CreateScreen />} />
            <Route path="/auth" element={<AuthScreen />} />
            <Route path="/track/:assetID" element={<TrackScreen />} />
            <Route path="/user/:creator" element={<UserScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="user/setting" element={<UpdateProfile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
