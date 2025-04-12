import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../helper/axiosinstance";

function Login({isloggedIn, setIsloggedIn,userData, setUserData}) {
  const navigate = useNavigate();

  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handelformdata(e) {
    const { name, value } = e.target;
    setLoginData({
      ...LoginData,
      [name]: value,
    });
  }

  async function OnLogin(e) {
    e.preventDefault();
    const { email, password } = LoginData;
  
    if (!email || !password) {
      alert("Every field is required");
      return;
    }
  
    try {
      const response = await axiosInstance.post("/user/login", LoginData);
      const data = response.data;
      localStorage.setItem("isloggedIn", "true"); 
      localStorage.setItem("userType", "user");
      localStorage.setItem("userData", JSON.stringify(data?.data));
      setUserData(data?.data); 
      setIsloggedIn(true); // Set login state to true
      navigate("/");
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
          Welcome Back
        </h2>
        <p
          className="text-center text-sm text-gray-600 mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Empowering Minds, One Lesson at a Time
        </p>

        <form onSubmit={OnLogin} className="space-y-4">
          <input
            type="text"
            name="email"
            placeholder="Email "
            value={LoginData.email}
            onChange={handelformdata}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC738D]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={LoginData.password}
            onChange={handelformdata}
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
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#9F425E] hover:underline font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;