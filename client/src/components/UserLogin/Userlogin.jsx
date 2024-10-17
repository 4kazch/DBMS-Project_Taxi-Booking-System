import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { log } from "console";
import { useNavigate } from "react-router-dom";
import styles from "./Userlogin.module.css";


function Userlogin() {
  // const navigate=useNavigate();
  // const handleSignin = (e) => {
  //     navigate('/trip-booking');
  // };

  const navigate = useNavigate();

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

  useEffect(() => {
    const container = document.getElementById("container");
    const registerbtn = document.getElementById("register");
    const loginbtn = document.getElementById("login");

    if (registerbtn && loginbtn && container) {
      registerbtn.addEventListener("click", () => {
        container.classList.add(styles.active);
      });

      loginbtn.addEventListener("click", () => {
        container.classList.remove(styles.active);
      });
    }
  }, []);

  return (
    <>
      <section className="flex flex-col items-center justify-center h-[100vh]">
        <div className={styles.container} id="container">
          <div className={styles.signup}>
            <form onSubmit={handleSubmitSignup}>
              <h1 className="text-3xl font-bold font-nunito mb-5">SIGN UP</h1>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Full Name"
                name="fullname"
                value={values.fullname}
                required
              />
              <input
                type="text"
                onChange={handleChange}
                placeholder="Gender"
                name="gender"
                value={values.gender}
                required
              />
              <input
                type="text"
                onChange={handleChange}
                placeholder="Date of Birth"
                name="dob"
                value={values.dob}
                required
              />
              <input
                type="email"
                onChange={handleChange}
                placeholder="Email"
                name="email"
                value={values.email}
                required
              />
              <input
                type="tel"
                onChange={handleChange}
                placeholder="Mobile Number"
                pattern="[0-9]{10}"
                name="phone"
                value={values.phone}
                required
              />
              <input
                type="text"
                onChange={handleChange}
                placeholder="Address"
                name="address"
                value={values.address}
                required
              />
              <input
                type="text"
                onChange={handleChange}
                placeholder="Username"
                name="username"
                value={values.username}
                required
              />
              <input
                type="password"
                onChange={handleChange}
                placeholder="Password"
                name="password"
                value={values.password}
                required
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div className={styles.signin}>
            <form onSubmit={handleSubmitLogin}>
              <h1 className="text-3xl font-bold font-nunito mb-5">Sign In</h1>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div className={styles.tooglecontainer}>
            <div className={styles.toogle}>
              <div className={`${styles.tooglepanel} ${styles.toogleleft}`}>
                <h1 className="text-3xl font-semibold font-nunito">
                  Welcome User! Already a Member ?
                </h1>
                <p>
                  Log in now to access your account and book rides instantly!
                </p>
                <button className={styles.hidden2} id="login">
                  Log In
                </button>
              </div>
              <div className={`${styles.tooglepanel} ${styles.toogleright}`}>
                <h1 className="text-3xl font-semibold font-nunito">
                  Hello, Friend ! <br />
                  New Here ?
                </h1>
                <p>
                  Sign up today for easy, convenient, and reliable taxi
                  services!
                </p>
                <button className={styles.hidden2} id="register">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Userlogin;
