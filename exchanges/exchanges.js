const universalHandler = require('./handlers/universalHandler');

module.exports = {
    BITFINEX: {
        id: 'bitfinex',
        name: 'Bitfinex',
        handler: universalHandler
    },
    KRAKEN: {
        id: 'kraken',
        name: 'Kraken',
        handler: universalHandler
    },
    COINBASEPRO: {
        id: 'coinbasepro',
        name: 'Coinbase PRO',
        handler: universalHandler
    },
    KUCOIN: {
        id: 'kucoin',
        name: 'Kucoin',
        handler: universalHandler
    }
}