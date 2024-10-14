require('dotenv').config();

import { createConnection } from 'mysql2';

// Database connection
const db = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

export default db;
