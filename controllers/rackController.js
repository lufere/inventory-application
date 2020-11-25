var Rack = require('../models/rack');
var Brand = require('../models/brand');
const {body, validationResult } = require('express-validator');
const async = require('async');

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
    Brand.find()
    .exec(function(err, brands){
        if(err)return next(err);
        res.render('rack_form',{title:'Create Rack', brands:brands});
    });
}

exports.rack_create_post = [
    function(req, res, next) {
        if(req.body.brand=='') req.body.brand=null;
        next();
    },

    body('type', 'Rack type required').trim().isLength({min:1}).escape(),
    body('brand').optional({checkFalsy:true}).escape(),
    body('price', 'Rack price required').trim().isFloat({min:0}).escape(),
    body('stock', 'Stock required').trim().isFloat({min:0}).escape(),
    body('gauge', 'Rack gauge required').trim().isFloat({min:0}).escape(),
    body('profile', 'Rack profile required').trim().isLength({min:1}).escape(),
    body('capacity').optional({checkFalsy:true}).trim().isFloat({min:0}).escape(),
    body('unit', 'Weight units required').trim().escape(),
    body('safeties', 'Safeties type required').trim().isLength({min:1}).escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var rack = new Rack({
            type:req.body.type,
            brand:req.body.brand,
            price:req.body.price,
            stock:req.body.stock,
            gauge:req.body.gauge,
            profile:req.body.profile,
            capacity:req.body.capacity,
            unit:req.body.unit,
            safeties:req.body.safeties,
        });

        if(!errors.isEmpty()){
            Brand.find()
            .exec(function(err,brands){
                if(err) return next (err);
                res.render('rack_form',{title:'Create Rack', errors:errors.array(), brands:brands, rack:rack});
            });
        }else{
            rack.save(function(err){
                if(err) return next(err);
                res.redirect(rack.url);
            })
        }
    }
]

exports.rack_delete_get = function(req, res, next){
    Rack.findById(req.params.id).populate('brand').exec(function(err,rack){
        if(err) return next(err);
        if(rack==null)res.redirect('catalog/racks');
        res.render('rack_delete',{title:'Delete Rack', rack:rack});
    });
}

exports.rack_delete_post = function(req, res, next){
    Rack.findByIdAndDelete(req.body.rackid).exec(function(err, rack){
        if(err) return next(err)
        res.redirect('/catalog/racks')
    });
}

exports.rack_update_get = function(req, res){
    async.parallel({
        rack: function(callback){
            Rack.findById(req.params.id).exec(callback);
        },
        brands: function(callback){
            Brand.find().exec(callback);
        }
    },
    function(err, results){
        if(err) return next(err);
        if(results.rack===null) res.redirect('/catalog/racks');
        res.render('rack_form', {title:'Update Rack', rack: results.rack, brands:results.brands});
    })
}

exports.rack_update_post = [
    function(req, res, next) {
        if(req.body.brand=='') req.body.brand=null;
        next();
    },

    body('type', 'Rack type required').trim().isLength({min:1}).escape(),
    body('brand').optional({checkFalsy:true}).escape(),
    body('price', 'Rack price required').trim().isFloat({min:0}).escape(),
    body('stock', 'Stock required').trim().isFloat({min:0}).escape(),
    body('gauge', 'Rack gauge required').trim().isFloat({min:0}).escape(),
    body('profile', 'Rack profile required').trim().isLength({min:1}).escape(),
    body('capacity').optional({checkFalsy:true}).trim().isFloat({min:0}).escape(),
    body('unit', 'Weight units required').trim().escape(),
    body('safeties', 'Safeties type required').trim().isLength({min:1}).escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var rack = new Rack({
            type:req.body.type,
            brand:req.body.brand,
            price:req.body.price,
            stock:req.body.stock,
            gauge:req.body.gauge,
            profile:req.body.profile,
            capacity:req.body.capacity,
            unit:req.body.unit,
            safeties:req.body.safeties,
            _id: req.params.id,
        });

        if(!errors.isEmpty()){
            Brand.find().exec(function(err, brands){
                res.render('rack_form',{title:'Update Rack', errors:errors.array(), rack:rack, brands:brands});
            });
        }else{
            Rack.findByIdAndUpdate(req.params.id, rack, {}, function(err, rack){
                if(err) return next(err);
                res.redirect(rack.url);
            });
        }
    }
]