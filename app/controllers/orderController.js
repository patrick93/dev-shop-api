var Developer = require('../models/developer');

function _placeOrder(req, res) {
    Developer.remove({}, function (err) {
        if (err) {
            res.send(err);
        }

        res.json({
            message: "Order Successfully"
        });
    })
}

module.exports = {
    placeOrder : _placeOrder
}