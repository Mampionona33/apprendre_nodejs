const express = require('express');
const app = express();
const fs = require('fs');
const { getDataBase } = require('./dataBase');

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

const db = getDataBase();

// show user list
app.get('/listUsers', (req, res) => {
  fs.readFile(__dirname + '/' + 'users.json', 'utf-8', (err, data) => {
    console.log(data);
    res.send(data);
  });
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
  console.log(db);
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

const PORT = 8081;
const Host = '127.0.0.1';

const server = app.listen(PORT, Host, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(host);
  console.log(port);
  console.log('example app listening at http://%s:%s', host, port);
});
