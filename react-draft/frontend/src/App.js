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
          <Route path="/track/:assetID" element={<Track />} />
          <Route path="/create" element={<Create />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/user" element={<User />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="setting" element={<Setting />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
