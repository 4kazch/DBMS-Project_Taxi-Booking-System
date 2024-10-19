const express = require('express');
const router = express.Router();
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const alert = require('alert'); 
require('dotenv').config();
let userid;

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
      const user=data[0];
      userid = user.user_id;
      
      return res.status(200).json(userid);
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

router.post('/book-trip', (req, res) => {
  const values = [
    req.body.source,
    req.body.destination,
    req.body.taxifare,
    req.body.taxiname
  ];

  const findTaxiQuery = `SELECT * FROM taxis WHERE status = 'AVAILABLE' AND type=? LIMIT 1`;

  db.query(findTaxiQuery,[req.body.taxiname], (err, taxiResult) => {
    if (err) return res.status(500).json("Error 1");

    if (taxiResult.length === 0) {
      return res.status(400).json('No available taxis at the moment');
    }

    const taxiId = taxiResult[0].taxi_id;
    const driverId = taxiResult[0].driver_id;
    const customerId=userid;

    const bookTripQuery = `
      INSERT INTO trips (customer_id, driver_id, taxi_id, pickup_location, dropoff_location, trip_fare)
      VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(bookTripQuery, [customerId, driverId, taxiId, req.body.source, req.body.destination, req.body.taxifare], (err, result) => {
      if (err) return res.status(500).json("Error 2");

      const updateTaxiStatusQuery = "UPDATE taxis SET status = 'IN SERVICE' WHERE taxi_id = ?";

      db.query(updateTaxiStatusQuery, [taxiId], (err) => {
        if (err) return res.status(500).json("Error 3");

        res.status(200).json({ message: 'Trip booked successfully with taxi', taxiId, driverId });
      });
    });
  });
});

router.get('/profile', (req, res) => {
  const customerId = userid;

  const sql = 'SELECT full_name, email, phone_number, address FROM users WHERE user_id = ?';
  db.query(sql, [customerId], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json('User not found');
    }

    return res.status(200).json(result[0]);
  });
});

router.get('/trip-history', (req, res) => {
  const customerId = userid;

  const sql = `
    SELECT t.trip_id, t.pickup_location, t.dropoff_location, t.trip_start_time, t.trip_fare, d.full_name AS driver_name, ta.license_plate AS taxi_license
    FROM trips t
    JOIN drivers d ON t.driver_id = d.driver_id
    JOIN taxis ta ON t.taxi_id = ta.taxi_id
    WHERE t.customer_id = ?
    ORDER BY t.trip_start_time DESC`;

  db.query(sql, [customerId], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No trips found' });
    }

    return res.status(200).json(results);
  });
});


module.exports=router;
