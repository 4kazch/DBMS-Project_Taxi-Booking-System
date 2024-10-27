const express = require('express');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

let driverid;

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT // PostgreSQL usually uses port 5432
});

router.post('/login', async (req, res) => {
  const sql = "SELECT * FROM drivers WHERE email = $1 AND password = $2";
  
  try {
    const { rows } = await db.query(sql, [req.body.email, req.body.password]);
    if (rows.length > 0) {
      const driver = rows[0];
      driverid = driver.driver_id;
      return res.status(200).json(driverid);
    } else {
      return res.status(400).json("No Record");
    }
  } catch (err) {
    return res.status(500).json("Error");
  }
});

router.post('/signup', async (req, res) => {
  const checkEmailQuery = "SELECT * FROM drivers WHERE email = $1";
  const insertUserQuery = `
    INSERT INTO drivers (full_name, gender, email, phone_number, license_number, address, date_of_birth, username, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;

  const values = [
    req.body.fullName,
    req.body.gender,
    req.body.email,
    req.body.phone,
    req.body.license,
    req.body.address,
    req.body.dob,
    req.body.username,
    req.body.password,
  ];

  try {
    const { rows } = await db.query(checkEmailQuery, [req.body.email]);
    if (rows.length > 0) {
      return res.status(400).json('Email already exists');
    }

    await db.query(insertUserQuery, values);
    return res.status(200).json('User registered successfully');
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router.get('/profile', async (req, res) => {
  const driverId = driverid;

  const sql = 'SELECT full_name, email, phone_number, license_number, address, date_of_birth FROM drivers WHERE driver_id = $1';
  
  try {
    const { rows } = await db.query(sql, [driverId]);
    if (rows.length === 0) {
      return res.status(404).json('Driver not found');
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router.get('/driver-trips', async (req, res) => {
  const driverId = driverid;

  const sql = 'SELECT * FROM trips WHERE driver_id = $1 AND status != $2';
  
  try {
    const { rows } = await db.query(sql, [driverId, "FINISHED"]);
    if (rows.length === 0) {
      return res.status(404).json('No trips assigned');
    }
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json('Error fetching trips');
  }
});

router.put('/finish-trip/:tripId', async (req, res) => {
  const tripId = req.params.tripId;

  const sql = 'UPDATE trips SET status = $1 WHERE trip_id = $2';
  
  try {
    const result = await db.query(sql, ["FINISHED", tripId]);
    if (result.rowCount === 0) {
      return res.status(404).json('Trip not found');
    }
    return res.status(200).json('Trip marked as finished');
  } catch (err) {
    return res.status(500).json('Error updating trip status');
  }
});

router.get('/driver-history', async (req, res) => {
  const driverId = driverid;

  const sql = 'SELECT * FROM trips WHERE driver_id = $1 ORDER BY trip_start_time DESC';
  
  try {
    const { rows } = await db.query(sql, [driverId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No trips found for this driver' });
    }
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching trip history' });
  }
});

module.exports = router;
