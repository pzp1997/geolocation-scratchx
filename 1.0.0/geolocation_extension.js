(function(ext) {
  var latitude, longitude;
  var locationHasBeenCalculated = false;

  /* if latLng is true, call callback with latitude else with longitude */
  var calculateLocation = function(latLng, cb) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;
        cb(latLng ? latitude : longitude);
      }, function(err) {
        alert('Failed to locate your position.');
        cb(0);
      });
    } else {
      alert('Your browser does not support geolocation.');
      cb(0);
    }
  };

  // Cleanup function when the extension is unloaded
  ext._shutdown = function() {};

  // Status reporting code
  // Use this to report missing hardware, plugin or unsupported browser
  ext._getStatus = function() {
    return {
      status: 2,
      msg: 'Ready'
    };
  };

  ext.get_latitude = function(callback) {
    if (locationHasBeenCalculated) {
      callback(latitude);
    } else {
      calculateLocation(true, callback);
    }
  };

  ext.get_longitude = function(callback) {
    if (locationHasBeenCalculated) {
      callback(longitude);
    } else {
      calculateLocation(false, callback);
    }
  };

  // Block and block menu descriptions
  var descriptor = {
    blocks: [
      ['R', 'longitude', 'get_longitude'],
      ['R', 'latitude', 'get_latitude']
    ]
  };

  // Register the extension
  ScratchExtensions.register('Geolocation', descriptor, ext);
})({});
