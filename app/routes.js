var express = require('express');
var Developer = require('./models/developer');
var cartController = require('./controllers/cartController');
var orderController = require('./controllers/orderController')

var router = express.Router();

router.route('/cart').post(cartController.addItem)
    .get(cartController.getAllItems);

router.route('/cart/:item_id')
    .delete(cartController.deleteItem)
    .put(cartController.updateItem);

router.route('/order')
    .post(orderController.placeOrder);

module.exports = router;