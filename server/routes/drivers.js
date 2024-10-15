const express = require('express');
const router = express.Router();
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let driverid;

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
      const driver=data[0];
      driverid = driver.driver_id;
      return res.status(200).json(driverid)
    } else {
      return res.status(400).json("No Record")
    }
  })
})

router.post('/signup', (req, res) => {
  const checkEmailQuery = "SELECT * FROM drivers WHERE email = ?";
  const insertUserQuery = "INSERT INTO drivers (full_name, gender, email, phone_number, license_number, address, date_of_birth, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    req.body.fullname,
    req.body.gender,
    req.body.email,
    req.body.phone,
    req.body.license,
    req.body.address,
    req.body.dob,
    req.body.username,
    req.body.password,
  ];

  db.query(checkEmailQuery, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) {
      return res.status(400).json('Email already exists');
    }

    db.query(insertUserQuery, values, (err, result) => {
      if (err) return res.json(err);
      return res.status(200).json('User registered successfully');
    });
  });
});

router.get('/profile', (req, res) => {
  const driverId = driverid;

  const sql = 'SELECT full_name, email, phone_number, license_number, address, date_of_birth FROM drivers WHERE driver_id = ?';
  db.query(sql, [driverId], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json('Driver not found');
    }

    return res.status(200).json(result[0]);
  });
});

router.get('/driver-trips', (req, res) => {
  const driverId = driverid;

  const sql = 'SELECT * FROM trips WHERE driver_id = ? AND status != "FINISHED"';
  
  db.query(sql, [driverId], (err, results) => {
    if (err) return res.status(500).json('Error fetching trips');
    if (results.length === 0) return res.status(404).json('No trips assigned');

    return res.status(200).json(results);
  });
});

router.put('/finish-trip/:tripId', (req, res) => {
  const tripId = req.params.tripId;

  const sql = 'UPDATE trips SET status = "FINISHED" WHERE trip_id = ?';

  db.query(sql, [tripId], (err, result) => {
    if (err) return res.status(500).json('Error updating trip status');
    if (result.affectedRows === 0) return res.status(404).json('Trip not found');

    return res.status(200).json('Trip marked as finished');
  });
});

router.get('/driver-history', (req, res) => {
  const driverId = driverid;

  const sql = 'SELECT * FROM trips WHERE driver_id = ? ORDER BY trip_start_time DESC';
  
  db.query(sql, [driverId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching trip history' });
    if (results.length === 0) return res.status(404).json({ message: 'No trips found for this driver' });

    return res.status(200).json(results);
  });
});

module.exports=router;
