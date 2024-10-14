const express = require('express');
const router = express.Router();
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const alert = require('alert'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

router.post('/login',(req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if(err) return res.status(500).json("Error");
    if(data.length > 0){
      return res.status(200).json("Login Successfully")
    } else {
      return res.status(400).json("No Record")
    }
  })
})

router.post('/signup', (req, res) => {
  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  const insertUserQuery = "INSERT INTO users (full_name, gender, date_of_birth, email, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    req.body.fullname,
    req.body.gender,
    req.body.dob,
    req.body.email,
    req.body.phone,
    req.body.address,
    req.body.username,
    req.body.password,
  ];

  // Check if email already exists
  db.query(checkEmailQuery, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) {
      return res.status(400).json('Email already exists');
    }

    //Insert new user if no existing email is found
    db.query(insertUserQuery, values, (err, result) => {
      if (err) return res.json(err);
      return res.status(200).json('User registered successfully');
    });
  });
});

module.exports=router;
