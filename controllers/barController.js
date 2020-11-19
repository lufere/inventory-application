var Bar = require('../models/bar');
var Brand = require('../models/brand');
var Plate = require('../models/plate');
var Rack = require('../models/rack');
var async = require('async');
const {body, validationResult} = require('express-validator');

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

exports.bar_create_get = function(req, res, next){
    Brand.find().exec(function(err, brands){
        if(err) next(err);
        console.log(brands[0]._id);
        res.render('bar_form', {title:'Create Bar', brands: brands});
    });
}

// exports.bar_create_post = function(req, res, next){
// }

exports.bar_create_post = [
    function(req, res, next) {
        if(req.body.brand=='') req.body.brand=null;
        req.body.olympic? req.body.olympic=true: req.body.olympic=false;
        next();
    },
    body('type', 'Bar type required').trim().isLength({min:1}).escape(),
    body('olympic').trim().escape(),
    body('brand').optional({checkFalsy:true}).escape(),
    body('price', 'Bar price required').trim().isFloat({min:0}).escape(),
    body('stock', 'Stock required').trim().isFloat({min:0}).escape(),
    body('weight', 'Bar weight required').trim().isFloat({min:0}).escape(),
    body('unit', 'Weight units required').trim().escape(),

    (req,res,next) =>{
        const errors = validationResult(req);

        var bar = new Bar({
            type:req.body.type,
            olympic:req.body.olympic,
            brand:req.body.brand,
            price:req.body.price,
            stock:req.body.stock,
            weight:req.body.weight,
            unit:req.body.unit,
        })

        if(!errors.isEmpty()){
            Brand.find().exec(function(err, brands){
                if(err) return next(err);
                res.render('bar_form', {title:'Create Bar', errors:errors.array(), bar:bar, brands:brands})
            })
        }else{
            bar.save(function(err){
                if(err) return next(err);
                res.redirect(bar.url);
            })
        }
    }
]


exports.bar_delete_get = function(req, res, next){
    Bar.findById(req.params.id).populate('brand').exec(function(err,bar){
        if(err) return next(err);
        if(bar == null) res.redirect('/catalog/brands')
        res.render('bar_delete',{title:'Delete Bar', bar:bar})
    })
}

exports.bar_delete_post = function(req, res, next){
    Bar.findByIdAndDelete(req.body.barid).exec(function(err,bar){
        if(err) return next(err);
        console.log(req.body.barid);
        res.redirect('/catalog/bars');
    });
}

exports.bar_update_get = function(req, res){
    res.send('NOT IMPLEMENTED: Bar update GET');
}

exports.bar_update_post = function(req, res){
    res.send('NOT IMPLEMENTED: Bar update POST');
}