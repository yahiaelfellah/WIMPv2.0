// rabbitmq.js

const amqp = require('amqplib');
const { serverCfg, queueCfg } = require("./config");
const schema = "amqp://";
require("dotenv").config();


async function setup() {
  let address = `${schema}${serverCfg.host}:${serverCfg.port}`;
  const connection = await amqp.connect(address);
  const channel = await connection.createChannel();
  return channel;
}

// Create a shared channel variable
const channelPromise = setup();

module.exports = {
  getChannel: async function() {
    return channelPromise;
  }
};
