const schedule = require('node-schedule');
const pairs = require('../pairs/pairs');

function getPrices(startDate) {
    pairs.forEach((pair) => {
        pair.exchanges.forEach((exchange) => {
            console.log(`Getting historic prices: ${exchange.name} ${pair.currency}/${pair.priceCurrency} Since: ${startDate.toUTCString()}`);
            exchange.handler.getPrice(pair.currency, pair.priceCurrency, exchange.id, startDate);
        });
    });
}

function getHistoricPrices() {
    const startEpoch = 1514764800000 // 2018-1-1:00:00:00
    const startDate = new Date(startEpoch);
    getPrices(startDate);
}

function getDailyPrices() {
    const thisDate = new Date();
    const startDate = new Date(Date.UTC(thisDate.getUTCFullYear(), thisDate.getUTCMonth(), thisDate.getUTCDate()));
    getPrices(startDate);
}

function startJob() {
    getHistoricPrices(); // Fill Database with all historic data
    const rule = new schedule.RecurrenceRule();
    rule.hour = 3; // Make scheduler execute every day at 03:00
    rule.minute = 0;
    rule.second = 0;
    schedule.scheduleJob(rule, function(){
        getDailyPrices(); // Get price data for today
    });
}

module.exports = {
    startJob,
}