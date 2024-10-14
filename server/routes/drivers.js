const express = require('express');
const router = express.Router();
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
  const sql = "SELECT * FROM drivers WHERE email = ? AND password = ?";
  
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if(err) return res.status(500).json("Error");
    if(data.length > 0){
      return res.status(200).json("Login Successfully")
    } else {
      return res.status(400).json("No Record")
    }
  })
})

router.post('/signup',(req, res)=>{
  const { fullName, gender, email, phone, license, address, dob, username, password } = req.body;

  const sql = "SELECT * FROM drivers WHERE email = ?";

  db.query(sql,[email],(err,data)=>{
    //if(err) return res.json("Error");
    if(data.length > 0){
      return res.status(400).json("Already exists")
    } else {
      const query='INSERT INTO drivers (full_name, gender, email, phone_number, license_number, address, date_of_birth, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

      db.query(query, [fullName,gender,email,phone,license,address,dob,username,password],(err,data)=>{
        if(err) return res.status(500).json("Error");
        res.json("Registered successfully");
      })
    }
  })
})

module.exports=router;
