const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/vms", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

let vmlogger = (req, res, next) => {
    let current_datetime = new Date();
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    let log = `${current_datetime} ${method} ${url} ${status}`;
    console.log(log);
    fs.appendFile('request_logs.txt', log + '\n', err => {
        if (err) {
            console.log(err);
        }
    });
    next();
};

app.use(vmlogger);

app.use(express.json());

const clustersRouter = require('./routes/clusters');
app.use('/clusters', clustersRouter);

app.listen(5000, () => console.log('Server started and listening on port 5000...'));