import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeminineNavbar from './components/layout/Navbar';
//import PostForm from './components/createposts/PostForm';
import Home from './pages/Home';
import Post from './pages/Posts';
import Create from './pages/Create';
import Blogs from './pages/Blogs';
import Helplines from './pages/Helplines';
import About from './pages/About';
import Contact from './pages/Contact';
import Posts from './pages/Posts';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/home/Footer';
import NgoRegister from './pages/NgoRegister';
import NgoLogin from './pages/NgoLogin';
import NgoDashboard from './pages/NgoDashboard';

const App = () => {
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [isNgoLoggedIn, setIsNgoLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  return (
    <Router>
      <div >
        {/* Navbar */}
        <FeminineNavbar userData={userData} setUserData={setUserData} isloggedIn={isloggedIn} setIsloggedIn={setIsloggedIn} />
        {/*<PostForm />*/}
        {/* Page Content */}
        <div>
          <Routes>
            <Route path="/" element={<Home userData={userData} setUserData={setUserData} isloggedIn={isloggedIn} setIsloggedIn={setIsloggedIn}/>} />
            <Route path="/posts" element={<Post />} />
            <Route path="/create" element={<Create userData={userData} setUserData={setUserData} isloggedIn={isloggedIn} setIsloggedIn={setIsloggedIn} />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/helplines" element={<Helplines />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/login" element={<Login userData={userData} setUserData={setUserData} isloggedIn={isloggedIn} setIsloggedIn={setIsloggedIn} />} />
            <Route path="/register" element={<Register userData={userData} setUserData={setUserData} isloggedIn={isloggedIn} setIsloggedIn={setIsloggedIn} />} />
            <Route path="/ngo-register" element={<NgoRegister/>}/>
            <Route path="/ngo-login" element={<NgoLogin/>}/>
            <Route path="/ngo-dashboard" element={<NgoDashboard/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;