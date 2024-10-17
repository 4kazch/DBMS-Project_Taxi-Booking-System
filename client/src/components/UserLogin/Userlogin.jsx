import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function UserLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [values, setValues] = useState({
    fullname: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    password: "",
  });

  function handleSubmitLogin(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/users/login", { email, password })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          navigate("/user-profile");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          window.alert("Invalid Email or Password. Please try again.");
        } else {
          window.alert("An error occurred during signin. Please try again.");
        }
      });
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  function handleSubmitSignup(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/users/signup", values)
      .then((res) => {
        if (res.status === 200) {
          window.alert("Registered Successfully. Go to Login.");
          setIsLogin(true);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          window.alert("Email already exists. Please use a different email.");
        } else {
          window.alert("An error occurred during signup. Please try again.");
        }
      });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-poppins">
      <nav className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg py-4 px-6 fixed w-full z-10 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="text-black text-3xl font-bold tracking-tighter">
                FASTAXI
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link 
                to="/help" 
                className="text-black font-semibold text-lg hover:text-gray-600 transition-colors duration-300 relative group"
              >
                Help
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-3xl font-bold text-center mb-6">
              {isLogin ? "Sign In" : "Sign Up"}
            </h2>
            {isLogin ? (
              <form onSubmit={handleSubmitLogin}>
                <div className="mb-4">
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
                >
                  Sign In
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmitSignup}>
                {Object.entries(values).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <input
                      type={key === "email" ? "email" : key === "password" ? "password" : "text"}
                      onChange={handleChange}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      name={key}
                      value={value}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-black text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
                >
                  Sign Up
                </button>
              </form>
            )}
            <p className="mt-4 text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-blue-500 hover:text-blue-700 transition-colors duration-300"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white py-4 px-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 FASTAXI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
