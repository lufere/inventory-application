var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrandSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    website: {type: String},
});

// BrandSchema.path('website').validate((val) => {
//     urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
//     return urlRegex.test(val);
// }, 'Invalid URL.');

BrandSchema
.virtual('url').
get(function(){
    return '/catalog/brand/' + this._id;
});

module.exports = mongoose.model('Brand', BrandSchema);