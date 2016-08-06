var Shopping = require('./../entity/shopping');

var Service = function(req, res, next) {
    var findById = Shopping.findById(req.params.id).exec();
    var remove   = Shopping.update({
        _id: req.params.id
    }, {
        $pull: {
            products: req.params.productId
        }
    });

    findById
        .then(function(shopping) {
            if (!shopping) {
                return res.status(404)
                          .json({
                              status: false,
                              data  : {}
                          });
            }

            remove
                .exec()
                .then(function(product) {
                    return res.status(200)
                              .json({
                                status: true,
                                data  : product
                              });
                })
                .catch(function(err) {
                    return res.status(500)
                              .json({
                                  status: false,
                                  data  : {}
                              });
                })
        })
        .catch(function(err) {
           return res.status(500)
                     .json({
                         status: false,
                         data  : {}
                     });
        });
};

module.exports = Service;