var Brand = require('../models/brand');
const {body, validationResult} = require('express-validator');

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