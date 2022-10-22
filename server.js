// START SERVER --------------------------------

const app = require('./app');
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server start on port :${port}`);
});
