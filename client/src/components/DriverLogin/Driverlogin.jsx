import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./Driverlogin.module.css"
import { log } from 'console';
import { useNavigate } from 'react-router-dom';

function Driverlogin() {

    const navigate=useNavigate();

    const [inputType, setInputType] = useState('text');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmitLogin(event){
        event.preventDefault();
        axios.post('http://localhost:5000/api/drivers/login', {email, password})
        .then(res => {
            if(res.status===200){
                navigate('/driver-page');
            }
        })
        .catch(err => console.log(err));
    }

    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        email: '',
        phone: '',
        license: '',
        address: '',
        dob: '',
        username: '',
        password: ''
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      function handleSubmitSignup(event){
        event.preventDefault();
        axios.post('http://localhost:5000/api/drivers/signup', formData)
        .then(res => console.log(res))
        .catch(err => console.log(err));
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
            <section className='bg-blue-400 flex flex-col items-center justify-center h-[100vh]'>
                <div className={styles.container} id="container">
                    <div className={styles.signup}>
                        <form onSubmit={handleSubmitSignup}>
                            <h1 className='text-3xl font-bold font-nunito mb-5'>SIGN UP</h1>
                            <input onChange={handleChange} type="text" placeholder="Full Name" required/>
                            <input onChange={handleChange} type="text" placeholder="Gender" required/>
                            <input onChange={handleChange} type="email" placeholder="Email" required/>
                            <input onChange={handleChange} type="tel" placeholder="Mobile Number" pattern='[0-9]{10}' required/>
                            <input onChange={handleChange} type="text" placeholder="Driver License Number" pattern="[A-Za-z0-9]{8,15}" required/>
                            <input onChange={handleChange} type="text" placeholder="Address" required />
                            <input onChange={handleChange} type={inputType} placeholder="Date of Birth" onFocus={() => setInputType('date')} onBlur={(e) => e.target.value === "" ? setInputType('text') : null} required />
                            <input onChange={handleChange} type="text" placeholder='Username' required/>
                            <input onChange={handleChange} type="password" placeholder="Password" required/>
                            <button type='submit'>Sign Up</button>
                        </form>
                    </div>
                    <div className={styles.signin}>
                        <form onSubmit={handleSubmitLogin}>
                            <h1 className='text-3xl font-bold font-nunito mb-5'>Sign In</h1>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                            <button type='submit'>Sign In</button>
                        </form>
                    </div>
                    <div className={styles.tooglecontainer}>
                        <div className={styles.toogle}>
                            <div className={`${styles.tooglepanel} ${styles.toogleleft}`}>
                                <h1 className='text-3xl font-semibold font-nunito'>Welcome User! Already a Member ?</h1>
                                <p>Log in to manage rides, track earnings, and access bookings.</p>
                                <button className={styles.hidden2} id="login">Log In</button>
                            </div>
                            <div className={`${styles.tooglepanel} ${styles.toogleright}`}>
                                <h1 className='text-3xl font-semibold font-nunito'>Hello, Friend ! <br />New Here ?</h1>
                                <p>Sign up now to start driving and earning with us!</p>
                                <button className={styles.hidden2} id="register">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Driverlogin