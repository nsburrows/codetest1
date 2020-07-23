'use strict';

const express = require('express');
const bodyParser = require('body-parser')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Helps us to parser the JSON to some readable HTML
app.use(bodyParser.json())

// Again helps with displaying the JSON as HTML
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

// Import Routes
const getRoutes = require('./routes/get');

app.use('/v1', getRoutes);

app.get('/', (req, res) => {
  res.send('HR Application System API v1');
});

app.listen(PORT, HOST);
console.log(`Node server succesfully running on http://${HOST}:${PORT}...`);
