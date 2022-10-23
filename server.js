// START SERVER --------------------------------
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATA_BASE_URI.replace(
  '<DATA_BASE_PASSWORD>',
  process.env.DATA_BASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server start on port :${port}`);
});
