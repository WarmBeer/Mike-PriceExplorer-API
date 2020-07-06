const db = require('./db');

function insertPrice(date, currency, price, priceCurrency, exchange) {
    const query =
        `
        INSERT INTO prices 
        (date, currency, price, priceCurrency, exchange) 
        VALUES (${date}, '${currency}', ${price}, '${priceCurrency}', '${exchange}')
        `;

    db.query(query, function(err, rows) {
        if (err && err.errno !== 1062) {
            console.error(err);
        }
    });
}

module.exports = {
    insertPrice,
}