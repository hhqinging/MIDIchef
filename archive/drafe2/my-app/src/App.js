

//the frist page to see -->
// the Home in Pages


import logo from './logo.svg';
import './App.css';
import { React } from 'react'
// import { BrowserRouter as Router, Route, Switch , Link} from 'react-router-dom'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';

import Home from './pages/Home';
import Track from './pages/Track';
import Artists from './pages/Artists';
import Trending from './pages/Trending';
import SignIn from './pages/SignIn';
import Create from './pages/Create';
import Kitchen from './pages/Kitchen';
import User from './pages/User';
import Gallery from './pages/Gallery';
import Setting from './pages/Setting';

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
          <Route path="/Kitchen" element={<Kitchen />} />
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/User" element={<User />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/Setting" element={<Setting />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;

