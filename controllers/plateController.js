var Plate = require('../models/plate');
var Brand = require('../models/brand');
const {body, validationResult } = require('express-validator');
const async = require('async');
const e = require('express');

exports.plate_list = function(req, res){
    Plate.find({}, 'weight brand price units')
    .populate('brand')
    .exec(function(err, results){
        if(err) return next(err);
        res.render('plate_list',{title: 'Plate list', plate_list: results});
    })
}

exports.plate_detail = function(req, res, next){
    Plate.findById(req.params.id)
        .populate('brand')
        .exec(function(err, results){
            if(err) return next(err);
            res.render('plate_detail', {title: 'Plate detail', plate: results});
        })
}

exports.plate_create_get = function(req, res){
    Brand.find()
    .exec(function(err, brands){
        if(err) return next(err);
        res.render('plate_form', {title:'Create Plate', brands:brands});
    });
}

exports.plate_create_post = [
    (req,res,next)=>{
        console.log('Brand ID: '+ req.body.brand);
        if(req.body.brand=='') req.body.brand=null;
        // console.log('Rubber Coated: '+ req.body.rubber_coated);
        next()
    },

    body('weight', 'Plate weight required').trim().isFloat({min:0}).escape(),
    body('units', 'Weight unit required').trim().escape(),
    body('brand').optional({checkFalsy:true}).escape(),
    body('price', 'Plate price required').trim().isFloat({min:0}).escape(),
    body('stock', 'Plate stock required').trim().isFloat({min:0}).escape(),
    body('olympic').trim().escape(),
    body('bumper').trim().toBoolean().escape(),
    body('rubber_coated').toBoolean().trim().escape(),
    body('handles').toBoolean().trim().escape(),
    
    (req,res,next)=>{
        const errors = validationResult(req);

        var plate = new Plate({
            weight:req.body.weight,
            units:req.body.units,
            brand:req.body.brand,
            price:req.body.price,
            stock:req.body.stock,
            olympic:req.body.olympic,
            bumper:req.body.bumper,
            rubber_coated:req.body.rubber_coated,
            handles:req.body.handles,
        });

        if(!errors.isEmpty()){
            Brand.find()
            .exec(function(err, brands){
                if(err) return next(err);
                res.render('plate_form', {title:'Create Plate', errors:errors.array(), brands:brands, plate:plate});
            });
        }else{
            plate.save(function(err){
                if(err) return next(err);
                res.redirect(plate.url);
            });
        }
    }    
]

exports.plate_delete_get = function(req, res, next){
    Plate.findById(req.params.id).populate('brand').exec(function(err, plate){
        if(err) return next(err);
        if(plate==null) res.redirect('/catalog/plates');
        res.render('plate_delete',{title:'Delete Plate', plate:plate});
    })
}

exports.plate_delete_post = function(req, res, next){
    Plate.findByIdAndDelete(req.body.plateid).exec(function(err,plate){
        if(err) return next(err);
        res.redirect('/catalog/plates')
    })
}

exports.plate_update_get = function(req, res, next){
    async.parallel({
        plate: function(callback){
            Plate.findById(req.params.id).exec(callback);
            // Plate.find().populate('brand').exec(callback);
        },
        brands: function(callback){
            Brand.find().exec(callback);
        }
    },
    function(err, results){
        if(err) return next(err);
        if(results.plate===null) res.redirect('/catalog/plates');
        res.render('plate_form',{title:'Update Plate', plate:results.plate, brands: results.brands});
    })
}

exports.plate_update_post = [
    (req,res,next)=>{
        if(req.body.brand=='') req.body.brand=null;
        next()
    },

    body('weight', 'Plate weight required').trim().isFloat({min:0}).escape(),
    body('units', 'Weight unit required').trim().escape(),
    body('brand').optional({checkFalsy:true}).escape(),
    body('price', 'Plate price required').trim().isFloat({min:0}).escape(),
    body('stock', 'Plate stock required').trim().isFloat({min:0}).escape(),
    body('olympic').trim().escape(),
    body('bumper').trim().toBoolean().escape(),
    body('rubber_coated').toBoolean().trim().escape(),
    body('handles').toBoolean().trim().escape(),
    
    (req,res,next)=>{
        const errors = validationResult(req);

        var plate = new Plate({
            weight:req.body.weight,
            units:req.body.units,
            brand:req.body.brand,
            price:req.body.price,
            stock:req.body.stock,
            olympic:req.body.olympic,
            bumper:req.body.bumper,
            rubber_coated:req.body.rubber_coated,
            handles:req.body.handles,
            _id: req.params.id,
        });
        
        if(!errors.isEmpty()){
            Brand.find().exec(function(err, brands){
                res.render('plate_form', {title:'Update Plate', errors:errors.array(), plate:plate, brands:brands});
            })
        }else{
            Plate.findByIdAndUpdate(req.params.id, plate, {}, function(err, plate){
                if(err) return next(err);
                res.redirect(plate.url);
            })
        }
    }
]