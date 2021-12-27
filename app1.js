// This app.js is used for supertest testing purposes and replace the server.js file

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/vms", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const clustersRouter = require('./routes/clusters');
app.use('/clusters', clustersRouter);

//The below line is commented out since I do not need the app.listen function for my test with Jest
// but required for Supertest.
const server = app.listen(5000, () => console.log('Server started and listening on port 5000...'));

module.exports = server;