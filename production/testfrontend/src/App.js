import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NarBar from "./screens-compo/Narbar";
import CreateScreen from "./screens/CreateScreen";
import HomeScreen from "./screens/HomeScreen";
import TrackScreen from "./screens/TrackScreen";
import UserScreen from "./screens/UserScreen";
import AuthScreen from "./screens/AuthScreen";
import "./App.css"

export default function App() {
  return (
    <BrowserRouter>
      {/* <div className="App" > */}
      <div>
        {/* <header> */}
        {/* <Link to="/">Test-MIDIchef</Link> */}
        <NarBar />
        {/* </header> */}
        <main>
          <Routes>
            <Route path="/create" element={<CreateScreen />} />
            <Route path="/authentication" element={<AuthScreen />} />
            <Route path="/track/:assetID" element={<TrackScreen />} />
            <Route path="/user/:creator" element={<UserScreen />} />
            <Route path="/" element={<HomeScreen />} />
            {/* <Route path="user/edit" element={<UserEdit/>} */}
          </Routes>
        </main>
        {/* <footer
          style={{
            position: "fixed",
            padding: "5px 5px 5px 5px",
            bottom: "0",
            width: "100%",
            height: "16px",
            background: "grey",
          }}
        >
          <div style={{ textAlign: "center" }}>All rights reserved</div>
        </footer> */}
      </div>
    </BrowserRouter>
  );
}
