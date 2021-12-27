const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const clustersRouter = require('./routes/clusters');
app.use('/clusters', clustersRouter);

app.listen(5000, () => console.log('Server started and listening on port 5000...'));