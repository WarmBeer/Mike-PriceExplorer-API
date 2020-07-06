const fetch = require('node-fetch');
const dao = require('../../dao/dao');

function getPrice(currency, priceCurrency, exchange, startDate) {
    let symbol = currency;
    if (currency === 'BTC' && exchange === 'kraken') {
        symbol = 'XBT'
    }
    fetch(`https://dev-api.shrimpy.io/v1/exchanges/${exchange}/candles?quoteTradingSymbol=${priceCurrency}&baseTradingSymbol=${symbol}&interval=1D&startDate=${startDate.toISOString()}`)
        .then((res) => res.json())
        .then((res) => {
            if (res.length > 0) {
                res.forEach((row) => {
                    const date = Date.parse(row.time);
                    dao.insertPrice(date, currency, row.close, priceCurrency, exchange);
                });
            } else {
                console.log(res);
            }
        });
}

module.exports = {
    getPrice,
}