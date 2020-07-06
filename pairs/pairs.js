const exchanges = require('../exchanges/exchanges');

const pairs = [
    {
        currency: 'BTC',
        priceCurrency: 'EUR',
        exchanges: [
            {
                id: exchanges.BITFINEX.id,
                name: exchanges.BITFINEX.name,
                handler: exchanges.BITFINEX.handler
            },
            {
                id: exchanges.KRAKEN.id,
                name: exchanges.KRAKEN.name,
                handler: exchanges.KRAKEN.handler
            },
            {
                id: exchanges.COINBASEPRO.id,
                name: exchanges.COINBASEPRO.name,
                handler: exchanges.COINBASEPRO.handler
            }
        ]
    },
    {
        currency: 'BTC',
        priceCurrency: 'USD',
        exchanges: [
            {
                id: exchanges.BITFINEX.id,
                name: exchanges.BITFINEX.name,
                handler: exchanges.BITFINEX.handler
            },
            {
                id: exchanges.KRAKEN.id,
                name: exchanges.KRAKEN.name,
                handler: exchanges.KRAKEN.handler
            },
            {
                id: exchanges.COINBASEPRO.id,
                name: exchanges.COINBASEPRO.name,
                handler: exchanges.COINBASEPRO.handler
            }
        ]
    }
];

module.exports = pairs;