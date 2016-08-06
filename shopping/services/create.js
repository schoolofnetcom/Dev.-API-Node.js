var Shopping = require('./../entity/shopping');

var Service = function(req, res, next) {
    var products = new Shopping(req.body);

    products
        .save()
        .then(function(result) {
            if (!result) {
                return res.status(400)
                          .json({
                              status: false,
                              data  : {}
                          })
            }

            return res.status(200)
                      .json({
                          status: true,
                          data  : result
                      })
        })
        .catch(function(err) {
            return res.status(500)
                      .json({
                          status: false,
                          data  : {}
                      });
        })
};

module.exports = Service;