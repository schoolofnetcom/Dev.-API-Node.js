var Purchase = require('./../entity/purchase');
var Shopping = require('./../../shopping/entity/shopping');

var Service = function(req, res, next) {
    var purchase = new Purchase(req.body);

    purchase.shopping = req.params.shoppingId;

    Shopping
        .findById(req.params.shoppingId)
        .populate('products')
        .exec()
        .then(function(shopping) {
            if (!shopping) {
                return res.status(404)
                    .json({
                        status: false,
                        data  : {}
                    });
            }

            var total = 0;
			
			shopping.products.forEach(function (value, key) {
				total = total + value.price;
			});

			purchase.total = total;
			purchase
				.save()
				.then(function(saved) {
					return res.status(200).json({ status: true, data: saved });
				})
				.catch(function (err) { return res.status(500).json({ status: false, data: {} }); });

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
