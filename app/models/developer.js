var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeveloperSchema = new Schema({
    id: Number,
    login: String,
    avatar_url: String,
    price: Number,
    hours: Number
});

module.exports = mongoose.model('Developer', DeveloperSchema);