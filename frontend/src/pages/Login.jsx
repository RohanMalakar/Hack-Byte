import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../helper/axiosinstance"; // adjust the path based on your file structure

function Login() {
  const navigate = useNavigate();

  const [LoginData, setLoginData] = useState({
    user_name: "",
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

    const { user_name, password } = LoginData;

    if (!user_name || !password) {
      alert("Every field is required");
      return;
    }

    try {
      const response = await axiosInstance.post("/user/login", LoginData);

      const data = response.data;

      // Example: store token and navigate
      localStorage.setItem("token", data.token);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      alert(msg);
    }

    setLoginData({
      user_name: "",
      password: "",
    });
  }

  const handleMouseMove = (e) => {
    const card = e.currentTarget.querySelector("form");
    const { clientX, clientY } = e;
    const { left, top, width, height } = card.getBoundingClientRect();
    const offsetX = clientX - left;
    const offsetY = clientY - top;
    const distanceX = offsetX / width - 0.5;
    const distanceY = offsetY / height - 0.5;
    const rotateX = distanceY * -20;
    const rotateY = distanceX * 20;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = document.querySelector(".card");
    card.style.transform = "rotateX(0) rotateY(0)";
  };

  return (
    <div className="flex flex-row justify-between h-screen w-full bg-black text-white">
      <div className="text-6xl w-[50%] text-center p-10 font-extrabold flex flex-col justify-center">
        <h1 className="p-10">We Are Always Here To Help You!</h1>
        <h3 className="text-3xl p-10 text-teal-300">
          "Empowering Minds, One Lesson at a Time. Log in to Continue Your
          Journey."
        </h3>
        <h3 className="text-2xl font-extralight pl-10 text-teal-300">
          "Welcome back! Education unlocks endless possibilities, empowering
          you to explore, grow, and achieve. Continue right where you left off
          and let every lesson bring you closer to your dreams. Your journey
          awaits—let’s begin!"
        </h3>
      </div>

      <div className="flex items-center w-[50%] justify-center h-full">
        <div
          className="relative h-[70%] w-[70%] bg-gray-800 border-solid-white group overflow-hidden hover:shadow-[0_0_15px_15px_teal] duration-1000 rounded-xl"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <form
            noValidate
            onSubmit={OnLogin}
            className="relative flex h-full w-full border rounded-xl p-10 gap-4 flex-col z-10 card bg-slate-900 bg-opacity-60"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.2s ease-out",
            }}
          >
            <h1 className="text-4xl text-teal-500 text-center font-bold">
              Login Now
            </h1>

            <div className="flex flex-col gap-2">
              <label htmlFor="user_name">Username :</label>
              <input
                type="text"
                id="user_name"
                required
                placeholder="Enter your username...."
                name="user_name"
                className="px-3 py-2 border rounded-md border-black bg-slate-300 text-black"
                onChange={handelformdata}
                value={LoginData.user_name}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                required
                placeholder="Enter your password....."
                name="password"
                className="px-5 py-2 border rounded-md border-black bg-slate-300 text-black"
                onChange={handelformdata}
                value={LoginData.password}
              />
            </div>

            <button className="relative bg-teal-400 mt-3 py-2 text-black font-bold text-lg rounded-md overflow-hidden group hover:bg-black hover:border-solid-white hover:text-white">
              <span className="absolute inset-0 bg-teal-800 opacity-40 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out"></span>
              Login
            </button>

            <p>
              Don’t have an account?{" "}
              <Link
                className="text-teal-400 text-lg font-semibold"
                to={"/SignUp"}
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
