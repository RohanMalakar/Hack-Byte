import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeminineNavbar from './components/layout/Navbar';
//import PostForm from './components/createposts/PostForm';
import Home from './pages/Home';
import Post from './pages/Posts';
import ReadPost from './pages/Read';
import Blogs from './pages/Blogs';
import Helplines from './pages/Helplines';
import About from './pages/About';
import Contact from './pages/Contact';
import Posts from './pages/Posts';

const App = () => {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        {/* Navbar */}
        <FeminineNavbar />
        {/*<PostForm />*/}
        {/* Page Content */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Post />} />
            <Route path="/read" element={<ReadPost />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/helplines" element={<Helplines />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;