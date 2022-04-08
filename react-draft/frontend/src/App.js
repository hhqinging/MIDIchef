import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Track from './pages/Track';
import SignIn from './pages/SignIn';
import Create from './pages/Create';
import Kitchen from './pages/Kitchen';
import User from './pages/User';
import Gallery from './pages/Gallery';
import Setting from './pages/Setting';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">{<Navbar />}</Link>
        </header>
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Track/:assetID" element={<Track />} />
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
