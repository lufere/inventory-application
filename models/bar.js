var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BarSchema = new Schema({
    weight: {type: Number, required: true},
    type: {type: String, required: true},
    olympic: {type: Boolean, required: true},
    price: {type: Number, required: true, min: 0},
    unit: {type: String, required: true, enum:['kg', 'lb']},
    brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
    stock: {type: Number, required: true, min: 0},
});

BarSchema
.virtual('url')
.get(function(){
    return '/catalog/bar/' + this._id;
});

module.exports = mongoose.model('Bar', BarSchema);