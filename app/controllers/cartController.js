var Developer = require('../models/developer');

function _addItem(req, res) {
    var developer = new Developer();
    developer.login = req.body.login;
    developer.id = req.body.id;
    developer.avatar_url = req.body.avatar_url;
    developer.price = req.body.price;
    developer.hours = req.body.hours;

    developer.save(function (err) {
        if (err) {
            res.send(err);
        }

        res.json({
            message: 'Item added'
        });
    });
}

function _getAllItems(req, res) {
    Developer.find(function (err, devs) {
        if (err) {
            res.send(err);
        }

        res.json(devs);
    });
}

function _updateItem(req, res) {
    Developer.findOne({
        id: req.params.item_id
    }, function (err, item) {
        if (err) {
            res.send(err);
        }

        item.login = req.body.login;
        item.id = req.body.id;
        item.avatar_url = req.body.avatar_url;
        item.price = req.body.price;
        item.hours = req.body.hours;

        item.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({
                message: 'Item Udated'
            });
        })
    })
}

function _deleteItem(req, res) {
    Developer.remove({
        id: req.params.item_id
    }, function (err, dev) {
        if (err) {
            res.send(err);
        }

        res.json({
            message: 'Successfully deleted'
        });
    })
}

module.exports = {
    addItem: _addItem,
    getAllItems: _getAllItems,
    updateItem: _updateItem,
    deleteItem: _deleteItem
}