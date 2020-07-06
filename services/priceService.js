const db = require('../dao/db');

function getPrice(req, res) {
    const startDate = req.query.start || 0;
    const endDate = req.query.end || 9999999999999;
    const currency = 'BTC';
    const query =
        `
        SELECT date, currency, price, priceCurrency, exchange FROM prices 
        WHERE currency = '${currency}' 
        AND date BETWEEN ${startDate} AND ${endDate} 
        `;

    try {
        db.query(query, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.json({
                    ok: false,
                    data: []
                });
            } else {
                res.json({
                    ok: true,
                    data: result
                });
            }
        });
    } catch (e) {
        console.error(e);
        res.json({
            ok: false,
            data: []
        });
    }
}


/*
function groupResultsByDate(data) {
    let results = [];
    data.forEach((row) => {
        row = JSON.parse(JSON.stringify(row));
        const key = new Date(row['date']).toUTCString();
        if (results.includes(key, 0)) {
            results[key].push(row);
        } else {
            results[key] = [];
            results[key].push(row);
        }
    });
    return results;
}
*/

module.exports = {
    getPrice,
}