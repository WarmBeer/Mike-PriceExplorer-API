/* Date: 1 July 2020
 * Author: Warm Beer
 * Discord: Warm Beer#3352
 */

require('dotenv').config();
const express = require('express'),
    cors = require('cors'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3010;

app.use(cors());
app.listen(port);

console.log('Bitcoin Price Explorer API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    console.info(`${req.method} ${req.originalUrl}`);
    res.on('finish', () => {
        console.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage}`)
    });
    next();
});

// Register routes
require('./routes/priceRoute')(app);

// Start job
const pricesJob = require('./jobs/fetchPricesJob');
//pricesJob.startJob();
