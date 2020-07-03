const fetch = require('node-fetch');
const db = require('../db');

function getBitfinexPrices() {
    fetch('https://api-pub.bitfinex.com/v2/candles/trade:1D:tBTCEUR/hist?limit=1&sort=1&start=1546300800000&end=1577919600000')
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
        });
}

function insertPrice(date, currency, eur, usd, exchange) {
    const query =
        `
        INSERT INTO prices 
        (date, currency, eur, usd, exchange) 
        VALUES (${date}, ${currency}, ${eur}, ${usd}, ${exchange})
        `;

    db.query(query);
}

function startJob() {
    getBitfinexPrices();
}

module.exports = {
    startJob,
}