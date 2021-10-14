require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

const limiter = rateLimit({
  windowMs: process.env.API_RATE_LIMIT_WINDOW * 60 * 1000, // 15 minutes
  max: process.env.API_RATE_LIMIT, // limit each IP to 100 requests per windowMs
  message:
    'Too many accounts created from this IP, please try again after an hour',
});

const checkLogin = (req, res, next) => {
  console.log('Login Logic');
  next();
};

app.get('/api/', checkLogin, limiter, function (req, res) {
  return res.send('API WORKS!');
});

// Port
const port = process.env.PORT || 8000;

// Starting a Server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
