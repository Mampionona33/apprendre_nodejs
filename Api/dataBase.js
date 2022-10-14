require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

async function connectToDataBase() {
  const uri =
    process.env.URI ||
    'mongodb+srv://mampionona:daddy4806@cluster0.tksr3.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('connect to Mongo at', uri);
    db = client.db();
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

// async function listDataBase

const getDataBase = () => {
  return db;
};

module.exports = { connectToDataBase, getDataBase };
