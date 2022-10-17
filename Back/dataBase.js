require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.DATABASE_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to mongoose'));

module.exports = db;
