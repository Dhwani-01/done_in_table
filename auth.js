const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./db'); // Import the database connection module
const app=express();
// Define a route for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

    if (user && bcrypt.compareSync(password, user.password)) {
      // Authentication successful
      //req.session.email= email;
      res.send('Logged in successfully');
    } else {
      // Authentication failed
      res.status(401).send('Authentication failed');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = app;
