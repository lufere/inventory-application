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

function barCreate(weight, unit, type, olympic, price, brand, stock, cb) {
  bardetail = {weight:weight , type: type, olympic:olympic, price:price, unit:unit, brand:brand, stock:stock}
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

function brandCreate(name, description, website, cb) {
  var brand = new Brand({ name: name });
  if(description != false) brand.description = description;
  if(website != false) brand.website = website;
       
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


function rackCreate(price, gauge, profile, brand, type, capacity, safeties, stock, cb) {
  rackdetail = { 
    price: price,
    gauge: gauge,
    profile: profile,
    type: type,
    safeties: safeties,
    stock: stock,
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
          brandCreate("Rogue Fitness","Rogue Fitness is the leading US-based manufacturer of strength and conditioning equipment and a major distributor of top brand fitness gear and accessories from around the country.", 'https://www.roguefitness.com/', callback);
        },
        function(callback) {
          brandCreate("Ivanko", 'Ivanko Barbell Company - In 1967, a young engineer passionate about bodybuilding and fitness realized that current manufacturers of free weights and strength equipment just “didn’t get it”. That man was Tom Lincir, founder of Ivanko Barbell. Since then he has made it his mission to introduce innovation to the fitness industry and perfect existing technologies. Today, Ivanko Barbell has a rich history of producing high quality and time tested products including urethane weight plates, dumbbells and barbells, pro-style dumbbells, Olympic bars and power bars, competition bumper plates, group aerobic exercise sets, cable attachments and more. ',  'https://ivankobarbell.com/', callback);
        },
        function(callback) {
          brandCreate("Eleiko", false, 'https://www.eleiko.com/es/home', callback);
        },
        function(callback) {
          brandCreate("Nautilus", false, 'https://www.nautilus.com/',callback);
        },
        function(callback) {
          brandCreate("Titan", false, 'https://www.titan.fitness/', callback);
        },
        ],
        // optional callback
        cb);
}


function createBars(cb) {
    async.parallel([
        function(callback) {
          barCreate(45, 'lb', 'straight', true, 300, brands[0], 10, callback);
        },
        function(callback) {
          barCreate(45, 'lb', 'straight', true, 250, brands[1], 5, callback);
        },
        function(callback) {
          barCreate(25, 'lb', 'ez curl', true, 195, brands[0], 2, callback);
        },
        function(callback) {
          barCreate(45, 'lb', 'squat', true, 445, brands[0], 1, callback);
        },
        function(callback) {
          barCreate(45, 'lb', 'multi grip', true, 275, brands[0], 0 ,callback);
        },
        function(callback) {
          barCreate(35, 'lb', 'straight', true, 300, brands[3], 0, callback);
        },
        function(callback) {
          barCreate(45, 'lb', 'straight', true, 630, brands[2], 2, callback);
        },
        function(callback) {
          barCreate(45, 'lb', 'straight', true, 300, brands[4], 5, callback);
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
        rackCreate(915, 11, '3x3', brands[0], 'power rack', false, 'pins', 5, callback)
      },
      function(callback) {
        rackCreate(510, 11, '3x3', brands[0], 'wall mounted', false, 'none', 10, callback)
      },
      function(callback) {
        rackCreate(1300, 11, '3x3', brands[0], 'power rack', false, 'straps', 2, callback)
      },
      function(callback) {
        rackCreate(500, 11, '2x3', brands[4], 'power rack', false, 'pins', 10, callback)
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




