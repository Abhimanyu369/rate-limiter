require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// API 1
const limiter = rateLimit({
  windowMs: process.env.API_RATE_LIMIT_WINDOW_1 * 60 * 1000, // 15 minutes
  max: process.env.API_RATE_LIMIT_1, // limit each IP to 100 requests per windowMs
  message: 'Too many API hits from this IP, please try again after an hour',
});

const checkLogic1 = (req, res, next) => {
  console.log('Login Logic 1');
  next();
};

app.get('/api/', checkLogic1, limiter, function (req, res) {
  return res.send('API WORKS!');
});

// API 2
const limiterOther = rateLimit({
  windowMs: process.env.API_RATE_LIMIT_WINDOW_2 * 60 * 1000, // 15 minutes
  max: process.env.API_RATE_LIMIT_2, // limit each IP to 100 requests per windowMs
  message: 'Too many API hits from this IP, please try again after an hour',
});

const checkLogic2 = (req, res, next) => {
  console.log('Login Logic 2');
  next();
};

app.get('/api/other', checkLogic2, limiterOther, function (req, res) {
  return res.send('API WORKS FOR OTHER!');
});

// Port
const port = process.env.PORT || 8000;

// Starting a Server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
