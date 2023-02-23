const rabbitmq = require("./rabbitmq");
const { queueCfg } = require("./config");
const manager = require("../routes/controllers/flows.management");

/**
 * Function helps to send the data to the other microservice
 * @param {Object} message
 * @param {String} queueId (optional) - the ID of the queue to publish to
 */
exports.sender = async (message, queueId = queueCfg.queueId) => {
  rabbitmq.getChannel().then((channel) => {
    // Use the channel to publish a message
    chan.assertQueue(queueCfg.queueId);
    channel.sendToQueue(
      queueId,
      Buffer.from(
        JSON.stringify({
          ...message,
          date: new Date(),
        })
      ),
      function (err, ok) {
        if (err !== null) {
          console.error("Error publishing message:", err);
        } else {
          console.log("Message published successfully.");
        }
      }
    );
  }).catch((ex) => {
    console.log(ex);
  });
};

/**
 * Helps to listen to the incoming messages
 * @param {String} queueId (optional) - the ID of the queue to consume from
 */
exports.consumer = async (queueId = queueCfg.queueId) => {
  rabbitmq.getChannel().then((channel) => {
    channel.assertQueue(queueId);
    console.log('Listening to Queue ID ' + queueId);
    channel.consume(
      queueId,
      (msg) => {
        const rc = JSON.parse(msg.content.toString());
        switch (rc.action) {
          case "create_nodered_instance":
            manager.startNodeRed();
            break;
           default:
            console.warn("Unknown message action:", rc.action);
        }
        channel.ack(msg);
      },
      { noAck: false }
    );
  }).catch((ex) => console.log(ex)) ;
}

