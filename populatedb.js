#! /usr/bin/env node

console.log('This script populates some test bars, brands, plates and racks to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Bar = require('./models/bar')
var Brand = require('./models/brand')
var Plate = require('./models/plate')
var Rack = require('./models/rack')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var bars = []
var brands = []
var plates = []
var racks = []

function barCreate(weight, unit, type, olympic, price, brand, cb) {
  bardetail = {weight:weight , type: type, olympic:olympic, price:price, unit:unit, brand:brand}
  if(brand != false) bardetail.brand = brand;

  var bar = new Bar(bardetail);
       
  bar.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Bar: ' + bar);
    bars.push(bar)
    cb(null, bar)
  }  );
}

function brandCreate(name, description, cb) {
  var brand = new Brand({ name: name });
  if(description =! false) brand.description = description;
       
  brand.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Brand: ' + brand);
    brands.push(brand)
    cb(null, brand);
  }   );
}

function plateCreate(weight, units, price, brand, handles, rubber_coated, olympic, stock, bumper, cb) {
  platedetail = { 
    weight: weight,
    price: price,
    handles: handles,
    rubber_coated: rubber_coated,
    olympic: olympic,
    units: units,
    stock: stock,
    bumper: bumper,
  }
  if (brand != false) platedetail.brand = brand;
    
  var plate = new Plate(platedetail);    
  plate.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Plate: ' + plate);
    plates.push(plate)
    cb(null, plate)
  }  );
}


function rackCreate(price, gauge, profile, brand, type, capacity, safeties, cb) {
  rackdetail = { 
    price: price,
    gauge: gauge,
    profile: profile,
    type: type,
    safeties: safeties,
  }    
  if (brand != false) rackdetail.brand = brand;
  if (capacity != false) rackdetail.capacity = capacity;
    
  var rack = new Rack(rackdetail);    
  rack.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Rack: ' + rack);
      cb(err, null)
      return
    }
    console.log('New Rack: ' + rack);
    racks.push(rack)
    cb(null, rack)
  }  );
}


function createBrands(cb) {
    async.parallel([
        function(callback) {
          brandCreate("Rogue Fitness",'Rogue Fitness is the leading US-based manufacturer of strength and conditioning equipment and a major distributor of top brand fitness gear and accessories from around the country.', callback);
        },
        function(callback) {
          brandCreate("Ivanko", false, callback);
        },
        function(callback) {
          brandCreate("Eleiko", false, callback);
        },
        function(callback) {
          brandCreate("Nautilus", false, callback);
        },
        function(callback) {
          brandCreate("Titan", false, callback);
        },
        ],
        // optional callback
        cb);
}


function createBars(cb) {
    async.parallel([
        function(callback) {
          barCreate(45, 'lb', 'straight', true, 300, brands[0], callback);
        },
        function(callback) {
          barCreate(45, 'lb', 'straight', true, 250, brands[1], callback);
        },
        function(callback) {
          barCreate(25, 'lb', 'ez curl', true, 195, brands[0], callback);
        },
        function(callback) {
          barCreate(45, 'lb', 'squat', true, 445, brands[0], callback);
        },
        function(callback) {
          barCreate(45, 'lb', 'multi grip', true, 275, brands[0], callback);
        },
        function(callback) {
          barCreate(35, 'lb', 'straight', true, 300, brands[3], callback);
        },
        function(callback) {
          barCreate(45, 'lb', 'straight', true, 630, brands[2], callback);
        },
        function(callback) {
          barCreate(45, 'lb', 'straight', true, 300, brands[4], callback);
        },
        ],
        // optional callback
        cb);
}


function createPlates(cb) {
    async.parallel([
        function(callback) {
          plateCreate(25, 'lb', 105, brands[0], false, false, true, 15, false, callback)
        },
        function(callback) {
          plateCreate(45, 'lb', 155, brands[0], false, false, true, 10, false, callback)
        },
        function(callback) {
          plateCreate(25, 'lb', 75, brands[0], false, true, true, 5, true, callback)
        },
        function(callback) {
          plateCreate(25, 'lb', 75, brands[0], false, true, true, 5, true, callback)
        },
        function(callback) {
          plateCreate(45, 'lb', 140, brands[0], false, false, true, 8, false, callback)
        },
        function(callback) {
          plateCreate(45, 'lb', 140, brands[0], false, false, true, 8, false, callback)
        },
        function(callback) {
          plateCreate(45, 'lb', 90, false, false, false, true, 8, false, callback)
        },
        function(callback) {
          plateCreate(45, 'lb', 120, brands[1], false, false, true, 8, false, callback)
        },
        ],
        // Optional callback
        cb);
}

function createRacks(cb) {
  async.parallel([
      function(callback) {
        rackCreate(915, 11, '3x3', brands[0], 'power rack', false, 'pins', callback)
      },
      function(callback) {
        rackCreate(510, 11, '3x3', brands[0], 'wall mounted', false, 'none', callback)
      },
      function(callback) {
        rackCreate(1300, 11, '3x3', brands[0], 'power rack', false, 'straps', callback)
      },
      function(callback) {
        rackCreate(500, 11, '2x3', brands[4], 'power rack', false, 'pins', callback)
      },
      ],
      // Optional callback
      cb);
}

async.series([
    createBrands,
    createBars,
    createPlates,
    createRacks
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Plates: '+plates);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




