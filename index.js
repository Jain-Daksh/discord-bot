const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const cors = require('cors');

dotenv.config();
const app = express();
const { router } = require('./routes/index');
//db.js


console.log('process.env.db', process.env.db)
const url = process.env.db;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
  .then(() => {
    console.log('Connected to the database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  })

const PORT = process.env.SERVER_PORT || 3011;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
