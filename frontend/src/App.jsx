import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeminineNavbar from './components/layout/Navbar';
import Home from './pages/Home';
import CreatePost from './pages/Create';
import ReadPost from './pages/Posts';
import Blogs from './pages/Blogs';
import Helplines from './pages/Helplines';
import Partners from './pages/Partners';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        {/* Navbar */}
        <FeminineNavbar />
        
        {/* Page Content */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/read" element={<ReadPost />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/helplines" element={<Helplines />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;