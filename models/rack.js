var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RackSchema = new Schema({
    price: {type: Number, required: true, min: 0},
    gauge: {type: Number, required: true},
    profile: {type: String, required: true, enum:['2x2','2x3','3x3']},
    brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
    type: {type: String, required: true, enum: ['Power Rack', 'Half Rack', 'Wall Mounted Rack']},
    capacity: {type: Number, min: 0},
    safeties: {type: String, required: true, enum:['Pins', 'Straps', 'Arms', 'None']},
    stock: {type: Number, required: true, min:0},
});

RackSchema
.virtual('url')
.get(function(){
    return '/catalog/rack/' + this._id;
});

module.exports = mongoose.model('Rack', RackSchema);