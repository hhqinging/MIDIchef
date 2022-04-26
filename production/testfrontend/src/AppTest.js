import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import TrackScreen from "./screens/TrackScreen";
import UserScreen from "./screens/UserScreen";

export default function App2() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Link to="/">
            Test-player /Users/hhq/Documents/test/test-player/frontend
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/track/:assetID" element={<TrackScreen />} />
            <Route path="/user/:creator" element={<UserScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
        <footer
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
        </footer>
      </div>
    </BrowserRouter>
  );
}
