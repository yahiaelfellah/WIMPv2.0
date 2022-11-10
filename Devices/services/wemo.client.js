var Wemo = require('wemo-client');
var wemo = new Wemo();
// const WeMoNG = require("../lib/wemo.js");
// var weMoNG = new WeMoNG();



// setInterval(weMoNG.start.bind(wemo), 60000);
// weMoNG.start();

/// discover the existing devices of wemo then save the deviceInfo 

wemo.discover((err,deviceInfo)=> {
  console.log('Wemo Device Found: %j', deviceInfo);
  /// the flow will be like notifying the user with the devices discovered  
})

exports.start = () => {
    weMoNG.start();
};

exports.subscribe = (deviceInfo) => {

    const client = wemo.client(deviceInfo);
    // we definitely want to listen to error events (e.g. device went offline),
    // Node will throw them as an exception if they are left unhandled  
    client.on('error', function(err) {
        console.log('Error: %s', err.code);
    });
    
    // Handle BinaryState events
    client.on('binaryState', function(value) {
        console.log('Binary State changed to: %s', value);
  });

}