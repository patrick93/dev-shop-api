var Developer = require('../models/developer');

function _addItem(req, res) {
    Developer.findOne({
        id: req.body.id
    }, function (err, dev) {
        if (err) {
            res.status(500).send(err);
        }

        if (dev) {
            res.status(400).json({
                errors: {
                    id: {
                        message: 'Cannot add item with the same id'
                    }
                }
            });
            return;
        }

        var developer = new Developer();
        developer.login = req.body.login;
        developer.id = req.body.id;
        developer.avatar_url = req.body.avatar_url;
        developer.price = req.body.price;
        developer.hours = req.body.hours;

        developer.save(function (err, dev) {
            if (err) {
                res.status(500).send(err);
            }

            res.status(200).json({
                message: 'Item added',
                developer: dev
            });
        });
    });
}

function _getAllItems(req, res) {
    Developer.find(function (err, devs) {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200).json(devs);
    });
}

function _updateItem(req, res) {
    Developer.findOne({
        id: req.params.item_id
    }, function (err, item) {
        if (err) {
            res.status(500).send(err);
        }

        if (!item) {
            res.status(404).send('Not found');
            return;
        }

        item.login = req.body.login;
        item.id = req.params.item_id;
        item.avatar_url = req.body.avatar_url;
        item.price = req.body.price;
        item.hours = req.body.hours;

        item.save(function (err, dev) {
            if (err) {
                res.status(500).send(err);
            }

            res.status(200).json({
                message: 'Item Udated',
                developer: dev
            });
        })
    })
}

function _deleteItem(req, res) {
    Developer.remove({
        id: req.params.item_id
    }, function (err, dev) {
        if (err) {
            res.status(500).send(err);
        }

        if (dev.result.n === 0) {
            res.status(404).send('Not Found');
            return;
        }

        res.status(200).json({
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