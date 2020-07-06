/*
* No longer needed since Bitfinex is supported by the universalHandler
 */

const fetch = require('node-fetch');
const dao = require('../../dao/dao');

function getPrice(dateRange, currency, priceCurrency, limit) {
    const exchange = 'Bitfinex';
    const startDate = dateRange[0];
    const endDate = dateRange[1] || startDate + 1;
    limit = limit || 1;
    fetch(`https://api-pub.bitfinex.com/v2/candles/trade:1D:t${currency}${priceCurrency}/hist?limit=${limit}&sort=1&start=${startDate}&end=${endDate}`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.length > 0) {
                res.forEach((row) => {
                    dao.insertPrice(row[0], currency, row[2], priceCurrency, exchange);
                });
            }
        });
}

module.exports = {
    getPrice,
}