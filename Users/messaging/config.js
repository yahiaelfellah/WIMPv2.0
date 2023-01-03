const path = require("path")
// TODO: Add all the correct dotenv require line of code  
require('dotenv').config({ path: path.resolve(__dirname, '../.env' )});

exports.serverCfg = Object.defineProperties(Object.create(null), {
    host: {
      value: process.env.MESSAGING_QUEUE_BASEURL,
      configurable: false,
      writable: false,
      enumerable: true
    },
    port: {
      value: process.env.MESSAGING_QUEUE_PORT,
      configurable: false,
      writable: false,
      enumerable: true
    },
    user: { value: '',},
    password: { value: '',},
    vhost: { value: '',}
  })
  
  // exports.exchangeCfg = Object.defineProperties(Object.create(null), {
  //   exId: {
  //     value: 'myExc',
  //     configurable: false,
  //     writable: false,
  //     enumerable: true
  //   },
  //   exType: {
  //     value: 'direct',
  //     configurable: false,
  //     writable: false,
  //     enumerable: true
  //   }
  // })
  
  exports.queueCfg = Object.defineProperties(Object.create(null), {
    queueId: {
      value:process.env.MESSAGING_QUEUE_ID,
      configurable: false,
      writable: false,
      enumerable: true
    },
    exclusive: {
      value: false,
      configurable: false,
      writable: false,
      enumerable: true
    }
  })