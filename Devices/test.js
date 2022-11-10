const WeMoNG = require('./lib/wemo.js');
var wemo = new WeMoNG();
//this won't work as there is no way to stop it...
//but is that a problem?
var interval = setInterval(wemo.start.bind(wemo), 60000);
wemo.start();


var Wemo = require('wemo-client');
var wemo = new Wemo();

/// discover the existing devices of wemo then save the deviceInfo 

wemo.discover((err,deviceInfo)=> {
  console.log('Wemo Device Found: %j', deviceInfo);
  /// the flow will be like notifying the user with the devices discovered  

})







wemo.discover(function(err, deviceInfo) {
  console.log("searching");
  console.log('Wemo Device Found: %j', deviceInfo);
 
  // Get the client for the found device
  var client = wemo.client(deviceInfo);
 
  // You definitely want to listen to error events (e.g. device went offline),
  // Node will throw them as an exception if they are left unhandled  
  client.on('error', function(err) {
    console.log('Error: %s', err.code);
  });
 
  // Handle BinaryState events
  client.on('binaryState', function(value) {
    console.log('Binary State changed to: %s', value);
  });
 
  // Turn the switch on
  client.setBinaryState(1);
});

wemo._clients



