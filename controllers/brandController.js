var Brand = require('../models/brand');
var Bar = require('../models/bar');
var Plate = require('../models/plate');
var Rack = require('../models/rack');

const async = require('async');
const {body, validationResult} = require('express-validator');
const { findByIdAndUpdate } = require('../models/bar');

exports.brand_list = function(req, res, next){
    Brand.find({}, 'name description')
        .exec(function(err, results){
            if(err) return next(err);
            res.render('brand_list', {title: 'Brand list', brand_list: results})
        });
}

exports.brand_detail = function(req, res, next){
    Brand.findById(req.params.id)
        .exec(function(err,results){
            if(err) next(err);
            res.render('brand_detail', {title: 'Brand detail', brand: results});
        })
}

exports.brand_create_get = function(req, res){
    res.render('brand_form', {title: 'Create Brand'});
}

exports.brand_create_post = [
    body('name', 'Brand name required').trim().isLength({min:1}).escape(),
    body('description').trim().optional({checkFalsy:true}).escape(),
    body('website', 'Invalid website').isURL().trim().optional({checkFalsy:true}).escape(),

    (req,res,next) =>{
        const errors = validationResult(req);

        var brand = new Brand({
            name: req.body.name,
            description: req.body.description,
            website: req.body.website,   
        });

        if(!errors.isEmpty()){
            res.render('brand_form', {title: 'Create Brand', brand:brand, errors:errors.array()});
            return
        } else{
            Brand.findOne({'name': req.body.name})
                .exec(function(err, found_brand){
                    if(err) return next(err)
                    if(found_brand){
                        res.redirect(found_brand.url);
                    }else{
                        brand.save(function(err){
                            if (err) return next(err);
                            res.redirect(brand.url);
                        });
                    }
                });
        }

    }
]

exports.brand_delete_get = function(req, res, next){
    async.parallel({
        brand: function(callback){
            Brand.findById(req.params.id).exec(callback)
        },
        bars: function(callback){
            Bar.find({'brand': req.params.id}).populate('brand').exec(callback)
        },
        plates: function(callback){
            Plate.find({'brand': req.params.id}).populate('brand').exec(callback)
        },
        racks: function(callback){
            Rack.find({'brand': req.params.id}).populate('brand').exec(callback)
        },
    },
    function(err, results){
        if(err) return next(err);
        if(results.brand == null) res.redirect('/catalog/brands');
        res.render('brand_delete', {title:'Delete Brand', brand:results.brand, bars:results.bars, plates:results.plates, racks:results.racks});
    })
}

exports.brand_delete_post = function(req, res, next){
    async.parallel({
        brand: function(callback){
            Brand.findById(req.params.id).exec(callback)
        },
        bars: function(callback){
            Bar.find({'brand': req.params.id}).populate('brand').exec(callback)
        },
        plates: function(callback){
            Plate.find({'brand': req.params.id}).populate('brand').exec(callback)
        },
        racks: function(callback){
            Rack.find({'brand': req.params.id}).populate('brand').exec(callback)
        },
    },
    function(err, results){
        if(err) return next(err);
        if(results.bars > 0 || results.plates > 0 || results.racks > 0) res.render('brand_delete', {title:'Delete Brand', brand:results.brand, bars:results.bars, plates:results.plates, racks:results.racks});
        Brand.findByIdAndDelete(req.body.brandid).exec(function(err){
            if(err) return next(err);
            res.redirect('/catalog/brands');
        });
    })

}

exports.brand_update_get = function(req, res, next){
    Brand.findById(req.params.id).exec(function(err,brand){
        if(err) return next(err);
        if(brand === null) res.redirect('/catalog/brands');
        res.render('brand_form', {title:'Update Brand', brand:brand});
    })
}

exports.brand_update_post = [
    body('name', 'Brand name required').trim().isLength({min:1}).escape(),
    body('description').trim().optional({checkFalsy:true}).escape(),
    body('website', 'Invalid website').isURL().trim().optional({checkFalsy:true}).escape(),

    (req,res,next) => {
        const errors = validationResult(req);

        var brand = new Brand({
            name: req.body.name,
            description: req.body.description,
            website: req.body.website,
            _id: req.params.id,
        });

        if(!errors.isEmpty()) res.render('brand_form', {title:'Update Brand', errors: errors.array(), brand:brand});
        Brand.findByIdAndUpdate(req.params.id, brand, {}, function(err, brand){
            res.redirect(brand.url);
        })
    }
]