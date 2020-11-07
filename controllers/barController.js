var Bar = require('../models/bar');

exports.index = function(req,res){
    res.send('NOT IMPLEMENTED: Home Page');
}

exports.bar_list = function(req, res){
    res.send('NOT IMPLEMENTED: Bar list');
}

exports.bar_detail = function(req, res){
    res.send('NOT IMPLEMENTED: Bar detail ' + req.params.id);
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