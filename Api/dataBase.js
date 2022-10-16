require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

async function connectToDataBase() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('connect to Mongo at', uri);
    db = client.db();
    // console.log('db:', db);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

const getDataBase = () => {
  return db;
};

module.exports = { connectToDataBase, getDataBase };
