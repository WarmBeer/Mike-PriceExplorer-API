const schedule = require('node-schedule');
const pairs = require('../pairs/pairs');

function getDailyPrices() {
    let thisDate = new Date();
    let datetime = new Date(Date.UTC(thisDate.getUTCFullYear(), thisDate.getUTCMonth(), thisDate.getUTCDate()));
    console.log('Getting prices for datetime:', datetime.toUTCString());
    datetime = datetime.getTime();

    pairs.forEach((pair) => {
        pair.exchanges.forEach((exchange) => {
            exchange.handler.getPrice([datetime], pair.currency, pair.priceCurrency);
        });
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