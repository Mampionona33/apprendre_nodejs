require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const { getDataBase, connectToDataBase } = require('./dataBase');

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

const router = express.Router();

// show user list
app.get('/listUsers', async (req, res) => {
  const db = getDataBase();
  const collection = db.collection('users');
  console.log(collection.find({}));

  // fs.readFile(__dirname + '/' + 'users.json', 'utf-8', (err, data) => {
  //   console.log(data);
  //   res.send(data);
  // });
});

// get user by id
app.get('/listUsers/:id', (req, res) => {
  fs.readFile(__dirname + '/' + 'users.json', 'utf-8', (err, data) => {
    const id = parseInt(Object.values(req.params).reduce((a, b) => a + b));
    const result = Object.entries(JSON.parse(data))
      .map((item) => {
        return item.filter((elem) => elem.id === id);
      })
      .flat();

    console.log(result);
    res.send(result);
  });
});

// create user
app.post('/addUser', (req, res) => {
  // First read existing users
  fs.readFile(__dirname + '/' + 'users.json', 'utf-8', (err, data) => {
    data = JSON.parse(data);
    const newData = [...data, req.body];
    console.log(newData);

    const writeStream = fs.createWriteStream('output.json');
    writeStream.write(JSON.stringify(newData, null, 2), 'utf8');
    writeStream.end();

    writeStream.on('finish', () => {
      console.log('write finish');
    });

    writeStream.on('error', (err) => {
      console.log(err.stack);
    });

    res.end(JSON.stringify(newData));
  });
});

const PORT = 8000;
// const Host = '127.0.0.1';

const server = app.listen(PORT, () => {
  // const host = server.address().address;
  const port = server.address().port;
  console.log(port);
  console.log('App listening at http://localhost:%s', port);
});

// start server
(async () => {
  try {
    await connectToDataBase();
    server;
  } catch (error) {
    console.log(error);
  }
})();
