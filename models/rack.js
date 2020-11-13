var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RackSchema = new Schema({
    price: {type: Number, required: true, min: 0},
    gauge: {type: Number, required: true},
    profile: {type: String, required: true, enum:['2x2','2x3','3x3']},
    brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
    type: {type: String, required: true, enum: ['power rack', 'half rack', 'wall mounted']},
    capacity: {type: Number, min: 0},
    safeties: {type: String, required: true, enum:['pins', 'straps', 'arms', 'none']},
});

RackSchema
.virtual('url')
.get(function(){
    return '/catalog/rack/' + this._id;
});

module.exports = mongoose.model('Rack', RackSchema);