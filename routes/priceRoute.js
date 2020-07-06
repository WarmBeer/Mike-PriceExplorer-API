/**
 * @module price/route
 * @author WarmBeer
 */
module.exports = function(app){

  const service = require('../services/priceService');

  app.get('/price/:currency', (req, res) => {
    service.getPrice(req, res);
  });

}