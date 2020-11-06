var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrandSchema = new Schema({
    name: {type: String, required: true},
    description: String,
});

BrandSchema
.virtual('url').
get(function(){
    return '/catalog/brand/' + this._id;
});

module.exports = mongoose.model('Brand', BrandSchema);