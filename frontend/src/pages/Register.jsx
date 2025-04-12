import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../helper/axiosinstance';

const Register = ({isloggedIn, setIsloggedIn,userData, setUserData}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response=await axiosInstance.post('/user/register', formData);
      const data = response.data;
      localStorage.setItem("isloggedIn", "true"); 
      localStorage.setItem("userType", "user");
      localStorage.setItem("userData", JSON.stringify(data?.data));
      setUserData(data?.data); 
      setIsloggedIn(true); 
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7A2F46] to-[#9F425E] p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#7A2F46]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Join our empowering community
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC738D]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC738D]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC738D]"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#7A2F46] text-white py-2 rounded-full hover:bg-[#9F425E] transition-all duration-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[#9F425E] cursor-pointer hover:underline"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;