const express = require('express');
const app = express();
const fs = require('fs');

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

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
  fs.readFile(__dirname + '/' + 'users.json', 'utf-8', (err, data) => {
    data = JSON.parse(data);
    data['user4'] = req.body['user4'];
    console.log(data);
    res.end(JSON.stringify(data));
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
