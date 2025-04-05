import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../helper/axiosinstance";

function NgoLogin() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    const { email, password } = loginData;
  
    if (!email || !password) {
      alert("Both email and password are required.");
      return;
    }
  
    try {
      const res = await axiosInstance.post("/ngo/login", loginData);
      const data = res.data;
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("ngoName", data.ngo?.name || "");
  
      localStorage.setItem("userType", "ngo");
  
      alert("Login successful!");
      navigate("/ngo-dashboard"); // or navigate to /ngo/dashboard etc.
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      alert(msg);
    }
  
    setLoginData({
      email: "",
      password: "",
    });
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7A2F46] to-[#9F425E] p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h2
          className="text-3xl font-bold text-center text-[#7A2F46]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          NGO Login
        </h2>
        <p
          className="text-center text-sm text-gray-600 mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Welcome back! Let's make an impact.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="NGO Email"
            value={loginData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC738D]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC738D]"
          />

          <button
            type="submit"
            className="w-full bg-[#7A2F46] text-white py-2 rounded-full hover:bg-[#9F425E] transition-all duration-300 font-semibold"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an NGO account?{" "}
          <Link
            to="/ngo/register"
            className="text-[#9F425E] hover:underline font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default NgoLogin;
