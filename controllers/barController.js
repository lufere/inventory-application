var Bar = require('../models/bar');
var Brand = require('../models/brand');
var Plate = require('../models/plate');
var Rack = require('../models/rack');
var async = require('async')

exports.index = function(req,res){
    async.parallel({
        bar_count: function(callback){
            Bar.countDocuments({},callback);
        },
        brand_count: function(callback){
            Brand.countDocuments({},callback);
        },
        plate_count: function(callback){
            Plate.countDocuments({},callback);
        },
        rack_count: function(callback){
            Rack.countDocuments({},callback);
        },
    },
    function(err, results){
        res.render('index',{title: 'Gym Equipment Home', data: results});
    })
}

exports.bar_list = function(req, res, next){
    Bar.find({}, 'brand type price')
        .populate('brand')
        .exec(function(err, results){
            if(err) return next(err);
            res.render('bar_list',{title: 'Bar list', bar_list: results});
        })
}

exports.bar_detail = function(req, res, next){
    Bar.findById(req.params.id)
        .populate('brand')
        .exec(function(err,results){
            if(err) return next(err);
            res.render('bar_detail', {title: 'Bar Detail', bar: results})
        })
}

exports.bar_create_get = function(req, res){
    res.send('NOT IMPLEMENTED: Bar create GET');
}

exports.bar_create_post = function(req, res){
    res.send('NOT IMPLEMENTED: Bar create POST');
}

exports.bar_delete_get = function(req, res){
    res.send('NOT IMPLEMENTED: Bar delete GET');
}

exports.bar_delete_post = function(req, res){
    res.send('NOT IMPLEMENTED: Bar delete POST');
}

exports.bar_update_get = function(req, res){
    res.send('NOT IMPLEMENTED: Bar update GET');
}

exports.bar_update_post = function(req, res){
    res.send('NOT IMPLEMENTED: Bar update POST');
}