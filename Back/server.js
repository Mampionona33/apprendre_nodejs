require('dotenv').config();
const express = require('express');
const app = express();

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

// Route to index
const indexRourter = require('./routes/index');
app.use('/', indexRourter);

// connect to DataBase
const connectToDataBase = require('./dataBase');
console.log(connectToDataBase);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server start on port : ${PORT}`);
});
