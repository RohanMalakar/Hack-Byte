import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../helper/axiosinstance";

function NgoRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    website: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleRegister(e) {
    e.preventDefault();

    const { name, email, password, description, website } = formData;

    if (!name || !email || !password || !description) {
      alert("All fields except website are required.");
      return;
    }

    try {
      const res = await axiosInstance.post("/ngo/register", {
        name,
        email,
        password,
        description,
        website,
      });

      alert("NGO registration successful!");
      navigate("/ngo-login");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      alert(msg);
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      description: "",
      website: "",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7A2F46] to-[#9F425E] p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h2
          className="text-3xl font-bold text-center text-[#7A2F46]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          NGO Registration
        </h2>
        <p
          className="text-center text-sm text-gray-600 mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Join Us In Making A Difference
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="NGO Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC738D]"
          />
          <input
            type="email"
            name="email"
            placeholder="NGO Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC738D]"
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC738D]"
          />
          <textarea
            name="description"
            placeholder="Describe your NGO's mission"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#CC738D]"
          />
          <input
            type="url"
            name="website"
            placeholder="Website (optional)"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC738D]"
          />

          <button
            type="submit"
            className="w-full bg-[#7A2F46] text-white py-2 rounded-full hover:bg-[#9F425E] transition-all duration-300 font-semibold"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#9F425E] hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default NgoRegister;
