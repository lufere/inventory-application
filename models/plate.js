var mongooose = require('mongoose');

var Schema = mongooose.Schema;

var PlateSchema = new Schema({
    weight:{type: Number, required: true, min: 0, max: 100},
    price: {type: Number, required: true, min: 0},
    brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
    handles: {type: Boolean, required: true},
    rubberCoated: {type: Boolean, required: true},
    olympic: {type: Boolean, required: true},
    units: {type: String, required: true, enum:['kg', 'lb']},
    stock: {type: Number, required: true, min: 0}
});

PlateSchema
.virtual('url')
.get(function(){
    return '/catalog/plate/' + this._id;
});

module.exports = mongoose.model('Plate', PlateSchema);