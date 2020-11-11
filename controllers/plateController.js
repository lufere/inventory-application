var Plate = require('../models/plate');

exports.plate_list = function(req, res){
    Plate.find({}, 'weight brand price units')
    .populate('brand')
    .exec(function(err, results){
        if(err) return next(err);
        res.render('plate_list',{title: 'Plate list', plate_list: results});
    })
}

exports.plate_detail = function(req, res){
    res.send('NOT IMPLEMENTED: plate detail ' + req.params.id);
}

exports.plate_create_get = function(req, res){
    res.send('NOT IMPLEMENTED: plate create GET');
}

exports.plate_create_post = function(req, res){
    res.send('NOT IMPLEMENTED: plate create POST');
}

exports.plate_delete_get = function(req, res){
    res.send('NOT IMPLEMENTED: plate delete GET');
}

exports.plate_delete_post = function(req, res){
    res.send('NOT IMPLEMENTED: plate delete POST');
}

exports.plate_update_get = function(req, res){
    res.send('NOT IMPLEMENTED: plate update GET');
}

exports.plate_update_post = function(req, res){
    res.send('NOT IMPLEMENTED: plate update POST');
}