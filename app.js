const express = require('express');
require('dotenv').config();

const morgan = require('morgan');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//  FIRST MIDDLEWARE-------------------------------
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// midleware
app.use((req, res, next) => {
  console.log('hello from middleware');
  // next is use to execute next middleware
  next();
});

// Middleware to add propreties requestTime to the request object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// serving static file from folder
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
