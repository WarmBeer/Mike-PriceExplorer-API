/**
 * @module price/route
 * @author WarmBeer
 */
module.exports = function(app){

  const service = require('../services/priceService');

  app.get('/price', (req, res) => {
    service.getPrice(req, res);
  });

}