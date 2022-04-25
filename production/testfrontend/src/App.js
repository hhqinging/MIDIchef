

import logo from './logo.svg';
// import './App.css';
import { React } from 'react'
// import { BrowserRouter as Router, Route, Switch , Link} from 'react-router-dom'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Track from './pages/Track';
import Artists from './pages/Artists';
import Trending from './pages/Trending';
import Create from './pages/Create';
import User from './pages/User';
import UserProfile from './pages/UserProfile';


const App = () => {
  return (
    <BrowserRouter>

      <Link to="/">{<Navbar />}</Link>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Track" element={<Track />} />
          <Route path="/Artists" element={<Artists />} />
          <Route path="/Trending" element={<Trending />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/User" element={<User />} />
          <Route path="/UserProfile" element={<UserProfile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;

