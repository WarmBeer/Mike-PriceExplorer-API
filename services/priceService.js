const db = require('../dao/db');

function getPrice(req, res) {
    const currency = req.params.currency || 'BTC';
    const priceCurrency = req.query.priceCurrency || 'EUR';
    const exchange = req.query.exchange || '%';
    const startDate = req.query.startDate || 0;
    const endDate = req.query.endDate || 9999999999999;
    const page = req.query.page || 1;
    const query =
        `
        SELECT date, currency, price, priceCurrency, exchange FROM prices 
        WHERE currency = '${currency}' 
        AND priceCurrency = '${priceCurrency}'
        AND exchange LIKE '${exchange}'
        AND date BETWEEN ${startDate} AND ${endDate} 
        ORDER BY date DESC
        LIMIT 100
        OFFSET ${100 * (page - 1)}
        `;

    const count_query =
        `
        SELECT COUNT(*) as count FROM prices 
        WHERE currency = '${currency}' 
        AND priceCurrency = '${priceCurrency}'
        AND exchange LIKE '${exchange}'
        AND date BETWEEN ${startDate} AND ${endDate} 
        ORDER BY date DESC
        `;

    try {
        db.query(count_query, function (err, result, fields) {
            if (err) {
                throw err;
            } else {
                const count = result[0].count;
                if (count > 0) {
                    db.query(query, function (err, result, fields) {
                        if (err) {
                            throw err;
                        } else {
                            res.json({
                                ok: true,
                                results: count,
                                data: result
                            });
                        }
                    });
                } else {
                    res.json({
                        ok: true,
                        results: 0,
                        data: []
                    });
                }
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