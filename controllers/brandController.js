var Brand = require('../models/brand');

exports.brand_list = function(req, res, next){
    Brand.find({}, 'name description')
        .exec(function(err, results){
            if(err) return next(err);
            res.render('brand_list', {title: 'Brand list', brand_list: results})
        });
}

exports.brand_detail = function(req, res){
    res.send('NOT IMPLEMENTED: brand detail ' + req.params.id);
}

exports.brand_create_get = function(req, res){
    res.send('NOT IMPLEMENTED: brand create GET');
}

exports.brand_create_post = function(req, res){
    res.send('NOT IMPLEMENTED: brand create POST');
}

exports.brand_delete_get = function(req, res){
    res.send('NOT IMPLEMENTED: brand delete GET');
}

exports.brand_delete_post = function(req, res){
    res.send('NOT IMPLEMENTED: brand delete POST');
}

exports.brand_update_get = function(req, res){
    res.send('NOT IMPLEMENTED: brand update GET');
}

exports.brand_update_post = function(req, res){
    res.send('NOT IMPLEMENTED: brand update POST');
}