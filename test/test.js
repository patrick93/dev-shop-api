var mongoose = require('mongoose');
var Developer = require('../app/models/developer');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe('Cart', function() {
    beforeEach(function(done) {
        Developer.remove({}, function(error) {
            done();
        });
    });

    it('returns no itens when the cart is empty', function(done){
        chai.request(server)
        .get('/api/cart')
        .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
        })
    });

    it('returns all itens in the cart', function(done){
        var dev1 = new Developer({
            id: 1,
            login: "user1",
            avatar_url: "http://avatar_url_user1.png",
            price: 100,
            hours:1
        });

        dev1.save(function(err) {
            if (err) {
                console.log(err);;
            }
        });

        var dev2 = new Developer({
            id: 2,
            login: "user2",
            avatar_url: "http://avatar_url_user2.png",
            price: 250,
            hours: 2
        });

        dev2.save(function(err) {
            if (err) {
                console.log(err);;
            }
        });

        chai.request(server)
        .get('/api/cart')
        .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2);
            done();
        });
    });

    it('add a item in the cart', function(done) {
        var dev1 = {
            id: 1,
            login: "user1",
            avatar_url: "http://avatar_url_user1.png",
            price: 100,
            hours:1
        };

        chai.request(server)
        .post('/api/cart')
        .send(dev1)
        .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Item added');
            res.body.developer.should.have.property('id').eql(1);
            res.body.developer.should.have.property('login').eql("user1");
            res.body.developer.should.have.property('avatar_url').eql("http://avatar_url_user1.png");
            res.body.developer.should.have.property('price').eql(100);
            res.body.developer.should.have.property('hours').eql(1);
            done()
        });
    });

    it('add second item in the cart', function(done) {
        var dev1 = new Developer({
            id: 1,
            login: "user1",
            avatar_url: "http://avatar_url_user1.png",
            price: 100,
            hours:1
        });

        dev1.save(function(err) {
            if (err) {
                console.log(err);;
            }
        });

        var dev2 = new Developer({
            id: 2,
            login: "user2",
            avatar_url: "http://avatar_url_user2.png",
            price: 250,
            hours: 2
        });

        chai.request(server)
        .post('/api/cart')
        .send(dev2)
        .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Item added');
            res.body.developer.should.have.property('id').eql(2);
            res.body.developer.should.have.property('login').eql("user2");
            res.body.developer.should.have.property('avatar_url').eql("http://avatar_url_user2.png");
            res.body.developer.should.have.property('price').eql(250);
            res.body.developer.should.have.property('hours').eql(2);
            Developer.find(function(err, devs) {
                expect(devs.length).to.equal(2);
            });
            done()
        });
    });

    it('return an error when trying to add item with the same id', function(done) {
        var dev1 = new Developer({
            id: 1,
            login: "user1",
            avatar_url: "http://avatar_url_user1.png",
            price: 100,
            hours:1
        });

        dev1.save(function(err) {
            if (err) {
                console.log(err);;
            }
        });

        var dev2 = new Developer({
            id: 1,
            login: "user2",
            avatar_url: "http://avatar_url_user2.png",
            price: 250,
            hours: 2
        });

        chai.request(server)
        .post('/api/cart')
        .send(dev2)
        .end(function(error, res) {
            res.should.have.status(400);
            res.body.errors.id.should.have.property('message').eql('Cannot add item with the same id');
            Developer.find(function(err, devs) {
                expect(devs.length).to.equal(1);
            });
            done()
        });
    });

    it('update an item in the cart by the id', function(done) {
        var dev1 = new Developer({
            id: 1,
            login: "user1",
            avatar_url: "http://avatar_url_user1.png",
            price: 100,
            hours:1
        });

        dev1.save(function(err) {
            if (err) {
                console.log(err);;
            }
        });

        var dev2 = new Developer({
            id: 1,
            login: "user2",
            avatar_url: "http://avatar_url_user2.png",
            price: 250,
            hours: 2
        });

        chai.request(server)
        .put('/api/cart/1')
        .send(dev2)
        .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Item Udated');
            res.body.developer.should.have.property('id').eql(1);
            res.body.developer.should.have.property('login').eql("user2");
            res.body.developer.should.have.property('avatar_url').eql("http://avatar_url_user2.png");
            res.body.developer.should.have.property('price').eql(250);
            res.body.developer.should.have.property('hours').eql(2);
            Developer.find(function(err, devs) {
                expect(devs.length).to.equal(1);
            });
            done()
        });
    });

    it('returns an error if the item is not in the cart', function(done) {
        var dev2 = new Developer({
            id: 2,
            login: "user2",
            avatar_url: "http://avatar_url_user2.png",
            price: 250,
            hours: 2
        });

        chai.request(server)
        .put('/api/cart/2')
        .send(dev2)
        .end(function(error, res) {
            res.should.have.status(404);
            Developer.find(function(err, devs) {
                expect(devs.length).to.equal(0);
            });
            done()
        });
    });

    it('delete an item in the cart', function(done) {
        var dev1 = new Developer({
            id: 1,
            login: "user1",
            avatar_url: "http://avatar_url_user1.png",
            price: 100,
            hours:1
        });

        dev1.save(function(err) {
            if (err) {
                console.log(err);;
            }
        });

        chai.request(server)
        .delete('/api/cart/1')
        .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Successfully deleted');
            Developer.find(function(err, devs) {
                expect(devs.length).to.equal(0);
            });
            done()
        });
    });

    it('return error if try to delete an item that is not in the cart', function(done) {
        var dev1 = new Developer({
            id: 1,
            login: "user1",
            avatar_url: "http://avatar_url_user1.png",
            price: 100,
            hours:1
        });

        dev1.save(function(err) {
            if (err) {
                console.log(err);;
            }
        });

        chai.request(server)
        .delete('/api/cart/2')
        .end(function(error, res) {
            res.should.have.status(404);
            Developer.find(function(err, devs) {
                expect(devs.length).to.equal(1);
            });
            done()
        });
    });

});


