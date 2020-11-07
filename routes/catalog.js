var express = require('express');
var router = express.Router();

var bar_controller = require('../controllers/barController');
var brand_controller = require('../controllers/brandController');
var plate_controller = require('../controllers/plateController');
var rack_controller = require('../controllers/rackController');

router.get('/', bar_controller.index);

router.get('/bars', bar_controller.bar_list);
//Bar creation
router.get('/bar/create', bar_controller.bar_create_get);
router.post('/bar/create', bar_controller.bar_create_post);
//Bar detail
router.get('/bar/:id', bar_controller.bar_detail);
//Bar deletion
router.get('/bar/:id/delete', bar_controller.bar_delete_get);
router.post('/bar/:id/delete', bar_controller.bar_delete_post);
//Bar updating
router.get('/bar/:id/update', bar_controller.bar_update_get);
router.post('/bar/:id/update', bar_controller.bar_update_post);

router.get('/brands', brand_controller.brand_list);
//brand creation
router.get('/brand/create', brand_controller.brand_create_get);
router.post('/brand/create', brand_controller.brand_create_post);
//brand detail
router.get('/brand/:id', brand_controller.brand_detail);
//brand deletion
router.get('/brand/:id/delete', brand_controller.brand_delete_get);
router.post('/brand/:id/delete', brand_controller.brand_delete_post);
//brand updating
router.get('/brand/:id/update', brand_controller.brand_update_get);
router.post('/brand/:id/update', brand_controller.brand_update_post);

router.get('/plates', plate_controller.plate_list);
//plate creation
router.get('/plate/create', plate_controller.plate_create_get);
router.post('/plate/create', plate_controller.plate_create_post);
//plate detail
router.get('/plate/:id', plate_controller.plate_detail);
//plate deletion
router.get('/plate/:id/delete', plate_controller.plate_delete_get);
router.post('/plate/:id/delete', plate_controller.plate_delete_post);
//plate updating
router.get('/plate/:id/update', plate_controller.plate_update_get);
router.post('/plate/:id/update', plate_controller.plate_update_post);

router.get('/racks', rack_controller.rack_list);
//rack creation
router.get('/rack/create', rack_controller.rack_create_get);
router.post('/rack/create', rack_controller.rack_create_post);
//rack detail
router.get('/rack/:id', rack_controller.rack_detail);
//rack deletion
router.get('/rack/:id/delete', rack_controller.rack_delete_get);
router.post('/rack/:id/delete', rack_controller.rack_delete_post);
//rack updating
router.get('/rack/:id/update', rack_controller.rack_update_get);
router.post('/rack/:id/update', rack_controller.rack_update_post);

module.exports = router;