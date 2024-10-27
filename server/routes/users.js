const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Pool } = require('pg'); // Use pg for PostgreSQL
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const alert = require('alert'); 
require('dotenv').config();
let userid;

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

router.post('/login', async (req, res) => {
  const sql = "SELECT * FROM users WHERE email = $1 AND password = $2";
  
  try {
    const result = await db.query(sql, [req.body.email, req.body.password]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      userid = user.user_id;
      return res.status(200).json(userid);
    } else {
      return res.status(400).json("No Record");
    }
  } catch (err) {
    return res.status(500).json("Error");
  }
});

router.post('/signup', async (req, res) => {
  const checkEmailQuery = "SELECT * FROM users WHERE email = $1";
  const insertUserQuery = `
    INSERT INTO users (full_name, gender, date_of_birth, email, phone_number, address, username, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;

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

  try {
    const checkResult = await db.query(checkEmailQuery, [req.body.email]);
    if (checkResult.rows.length > 0) {
      return res.status(400).json('Email already exists');
    }

    await db.query(insertUserQuery, values);
    return res.status(200).json('User registered successfully');
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router.post('/book-trip', async (req, res) => {
  const findTaxiQuery = `SELECT * FROM taxis WHERE status = 'AVAILABLE' AND type = $1 LIMIT 1`;
  
  try {
    const taxiResult = await db.query(findTaxiQuery, [req.body.taxiname]);
    if (taxiResult.rows.length === 0) {
      return res.status(400).json('No available taxis at the moment');
    }

    const taxi = taxiResult.rows[0];
    const taxiId = taxi.taxi_id;
    const driverId = taxi.driver_id;
    const customerId = userid;

    const bookTripQuery = `
      INSERT INTO trips (customer_id, driver_id, taxi_id, pickup_location, dropoff_location, trip_fare)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const tripValues = [customerId, driverId, taxiId, req.body.source, req.body.destination, req.body.taxifare];

    await db.query(bookTripQuery, tripValues);

    const updateTaxiStatusQuery = "UPDATE taxis SET status = 'IN SERVICE' WHERE taxi_id = $1";
    await db.query(updateTaxiStatusQuery, [taxiId]);

    res.status(200).json({ message: 'Trip booked successfully with taxi', taxiId, driverId });
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router.get('/profile', async (req, res) => {
  const customerId = userid;
  const sql = 'SELECT full_name, email, phone_number, address FROM users WHERE user_id = $1';

  try {
    const result = await db.query(sql, [customerId]);
    if (result.rows.length === 0) {
      return res.status(404).json('User not found');
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router.get('/trip-history', async (req, res) => {
  const customerId = userid;
  const sql = `
    SELECT t.trip_id, t.pickup_location, t.dropoff_location, t.trip_start_time, t.trip_fare, d.full_name AS driver_name, ta.license_plate AS taxi_license
    FROM trips t
    JOIN drivers d ON t.driver_id = d.driver_id
    JOIN taxis ta ON t.taxi_id = ta.taxi_id
    WHERE t.customer_id = $1
    ORDER BY t.trip_start_time DESC
  `;

  try {
    const results = await db.query(sql, [customerId]);
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'No trips found' });
    }
    return res.status(200).json(results.rows);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

module.exports = router;
