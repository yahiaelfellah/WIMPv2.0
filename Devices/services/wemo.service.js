const util = require("util");
const ip = require("ip");
const wemo = require("../lib/wemo.js");
var wemo = new WeMoNG();

var subscriptions = {};

exports.start = () => {
  wemo.start();
};

exports.subscribe = (deviceID) => {
  // get the device using the utils utils/wemo.js
  // change this to get it from the deviceID array from the user
  const device = wemo.get(deviceID);
  if (device) {
    if (subscriptions[deviceID]) {
      subscriptions[deviceID].count++;
    } else {
        var ip;
    }
  }
};
