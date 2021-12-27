// require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://telmo:secret@206.189.101.117:27017/vms?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const clustersRouter = require('./routes/clusters');
app.use('/clusters', clustersRouter);

module.exports = app;

// app.listen(5000, () => console.log('Server started and listening on port 5000...'));
