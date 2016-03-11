(function(ext) {
  /* if latLng is true, call callback with latitude else with longitude */
  var calculateLocation = function(latLng, cb) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        cb(latLng ? pos.coords.latitude : pos.coords.longitude);
      }, function(err) {
        cb(null);
      });
    } else {
      cb(null);
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

  ext.get_latitude = calculateLocation(true, callback);

  ext.get_longitude = calculateLocation(false, callback);

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
