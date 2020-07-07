const db = require('../dao/db');

function getPrice(req, res) {
    const currency = req.params.currency || 'BTC';
    const priceCurrency = req.query.priceCurrency || 'EUR';
    const exchange = req.query.exchange || '%';
    const startDate = req.query.startDate || 0;
    const endDate = req.query.endDate || startDate;
    const page = req.query.page || 1;
    const query =
        `
        SELECT date, currency, price, priceCurrency, exchange FROM prices 
        WHERE currency = '${currency}' 
        AND priceCurrency = '${priceCurrency}'
        AND exchange LIKE '${exchange}'
        AND date BETWEEN ${startDate} AND ${endDate} 
        ORDER BY date DESC, price ASC
        LIMIT 2000
        OFFSET ${100 * (page - 1)}
        `;

    const count_query =
        `
        SELECT COUNT(*) as count FROM prices 
        WHERE currency = '${currency}' 
        AND priceCurrency = '${priceCurrency}'
        AND exchange LIKE '${exchange}'
        AND date BETWEEN ${startDate} AND ${endDate} 
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

module.exports = {
    getPrice,
}