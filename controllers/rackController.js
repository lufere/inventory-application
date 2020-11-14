var Rack = require('../models/rack');

exports.rack_list = function(req, res){
    Rack.find({}, 'type brand price')
    .populate('brand')
    .exec(function(err, results){
        if(err) return next(err);
        res.render('rack_list',{title: 'Rack list', rack_list: results});
    })
}

exports.rack_detail = function(req, res, next){
    Rack.findById(req.params.id)
        .populate('brand')
        .exec(function(err, results){
            if(err) return next(err);
            res.render('rack_detail', {title: 'Rack detail', rack: results});
        });
}

exports.rack_create_get = function(req, res){
    res.send('NOT IMPLEMENTED: rack create GET');
}

exports.rack_create_post = function(req, res){
    res.send('NOT IMPLEMENTED: rack create POST');
}

exports.rack_delete_get = function(req, res){
    res.send('NOT IMPLEMENTED: rack delete GET');
}

exports.rack_delete_post = function(req, res){
    res.send('NOT IMPLEMENTED: rack delete POST');
}

exports.rack_update_get = function(req, res){
    res.send('NOT IMPLEMENTED: rack update GET');
}

exports.rack_update_post = function(req, res){
    res.send('NOT IMPLEMENTED: rack update POST');
}