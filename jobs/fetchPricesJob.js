const fetch = require('node-fetch');
const schedule = require('node-schedule');
const db = require('../db');

function getDailyPrices() {
    let thisDate = new Date();
    let datetime = new Date(Date.UTC(thisDate.getUTCFullYear(), thisDate.getUTCMonth(), thisDate.getUTCDate()));
    console.log('Getting prices for datetime:', datetime.toUTCString());
    datetime = datetime.getTime();

    getBitfinexPrice([datetime], 'BTC', 'EUR', 1);
}

function getBitfinexPrice(dateRange, currency, priceCurrency, limit) {
    const exchange = 'Bitfinex';
    const startDate = dateRange[0];
    const endDate = dateRange[1] || startDate + 1;
    limit = limit || 1;
    fetch(`https://api-pub.bitfinex.com/v2/candles/trade:1D:t${currency}${priceCurrency}/hist?limit=${limit}&sort=1&start=${startDate}&end=${endDate}`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (dateRange[1]) {

            } else {
                insertPrice(startDate, currency, res[0][2], priceCurrency, exchange);
            }
        });
}

function insertPrice(date, currency, price, priceCurrency, exchange) {
    const query =
        `
        INSERT INTO prices 
        (date, currency, price, priceCurrency, exchange) 
        VALUES (${date}, '${currency}', ${price}, '${priceCurrency}', '${exchange}')
        `;

    db.query(query, function(err, rows) {
        if (err) {
            console.error(err);
        }
    });
}

function startJob() {
    getDailyPrices();
    /*
    const rule = new schedule.RecurrenceRule();
    rule.hour = 3;
    schedule.scheduleJob(rule, function(){
        getDailyPrices();
    });
    */
}

module.exports = {
    startJob,
}