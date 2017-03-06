var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Developer = require('./app/models/developer');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/' + env);

mongoose.connect(config.DATABASE_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/cart')
    .post(function(req, res) {
        var developer = new Developer();
        developer.login = req.body.login;
        developer.id = req.body.id;
        developer.avatar_url = req.body.avatar_url;
        developer.price = req.body.price;

        developer.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Developer added'});
        });
    })
    .get(function(req, res) {
        Developer.find(function(err, devs){
            if (err) {
                res.send(err);
            }

            res.json(devs);
        });
    })

router.route('/cart/:item_id')
    .delete(function(req, res) {
        Developer.remove({
            id: req.params.item_id
        }, function(err, dev) {
            if (err) {
                res.send(err);
            }

            res.json({message: 'Successfully deleted'});
        })
    })

router.route('/order')
    .post(function(req, res) {
        Developer.remove({}, function(err){
            if (err) {
                res.send(err);
            }

            res.json({message: "Order Successfully"});
        })
    })

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);