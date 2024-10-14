const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const driverRoutes = require('./routes/drivers');
const userRoutes = require('./routes/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection


app.use('/api/drivers', driverRoutes);
app.use('/api/users', userRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Taxi Management API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
