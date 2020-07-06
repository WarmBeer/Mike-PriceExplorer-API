const exchanges = require('../exchanges/exchanges');

const pairs = [
    {
        currency: 'BTC',
        priceCurrency: 'EUR',
        exchanges: [
            {
                name: exchanges.BITFINEX.name,
                handler: exchanges.BITFINEX.handler
            }
        ]
    },
    {
        currency: 'BTC',
        priceCurrency: 'USD',
        exchanges: [
            {
                name: exchanges.BITFINEX.name,
                handler: exchanges.BITFINEX.handler
            }
        ]
    }
];

module.exports = pairs;