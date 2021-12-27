// This app.js is used for supertest testing purposes and replace the server.js file

const express = require('express');
const clustersRouter = require('./routes/clusters');

function createServer() {
    const app = express()
    app.use(express.json())
    app.use('/clusters', clustersRouter)
    return app
}

module.exports = createServer