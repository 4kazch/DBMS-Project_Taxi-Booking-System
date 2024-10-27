const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Import pg for PostgreSQL
const driverRoutes = require('./routes/drivers');
const userRoutes = require('./routes/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  port: process.env.DB_PORT, // Usually 5432 for PostgreSQL
});



// Make the database connection accessible to routes
app.set('db', db);

// Route handlers
app.use('/api/drivers', (req, res, next) => {
  req.db = db; // Pass the db instance to route handlers
  next();
}, driverRoutes);

app.use('/api/users', (req, res, next) => {
  req.db = db; // Pass the db instance to route handlers
  next();
}, userRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Taxi Management API');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
