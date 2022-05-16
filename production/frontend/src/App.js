import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NarBar from "./screens-compo/Narbar";
import CreateScreen from "./screens/CreateScreen";
import HomeScreen from "./screens/HomeScreen";
import TrackScreen from "./screens/TrackScreen";
import UserScreen from "./screens/UserScreen";
import AuthScreen from "./screens/AuthScreen";
import UserSales from "./screens/UserSales";
import UserCreation from "./screens/UserCreation";
import UserOwned from "./screens/UserOwned";
import UpdateProfile from "./screens/updateProfile";
import ProfileScreen from "./screens/ProfileScreen";
import OwnedTracks from "./screens/ownedTracks";
import ExploreTracks from "./screens/ExploreTracks";
import ExploreTrending from "./screens/ExploreTrending";

import "./App.css";
import { isLogin } from "./screens-compo/MyAlgo";
import { Navigate } from "react-router-dom";
import ProfileSales from "./screens/ProfileSales";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <NarBar />
        <main>
          <Routes>
            <Route path="/create" element={<CreateScreen />} />
            <Route path="/track/:assetID" element={<TrackScreen />} />
            <Route path="/user/:user" element={<UserScreen />} />
            <Route path="/user/:user/sales" element={<UserSales />} />
            <Route path="/user/:user/owned" element={<UserOwned />} />
            <Route path="/user/:user/creation" element={<UserCreation />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="user/setting" element={<UpdateProfile />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/profile/sales" element={<ProfileSales />} />
            <Route path="/profile/owned" element={<OwnedTracks />} />
            <Route path="/tracks" element={<ExploreTracks />} />
            <Route path="/trending" element={<ExploreTrending />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
