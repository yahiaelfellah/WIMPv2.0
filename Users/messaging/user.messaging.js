const IdentityModel = require("../routes/models/identity.model");
const rabbitmq = require("./rabbitmq");
const { queueCfg } = require("./config");

require("dotenv").config();

/**
 * Function helps to send the data to the other microservice
 * @param {Object} message
 * @param {String} queueId (optional) - the ID of the queue to publish to
 */
exports.sender = async (message, queueId = queueCfg.queueId) => {
  rabbitmq.getChannel().then((channel) => {
    // Use the channel to publish a message
    console.log("send to channel  ID " + queueId)
    channel.assertQueue(queueId);
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
    channel.consume(
      queueId,
      (msg) => {
        const rc = JSON.parse(msg.content.toString());
        switch (rc.action) {
          case "patch_flow":
            IdentityModel.patchIdentityFlows(rc.data.id, rc.data.body);
            break;
          case "patch_device":
            IdentityModel.patchIdentityDevices(rc.data.id, rc.data.body);
            break;
          case "patch_nodered_instance":
            IdentityModel.patchIdentityNodeRedInstance(
              rc.data.id,
              rc.data.body
            );
            break;
          default:
            console.warn("Unknown message action:", rc.action);
        }
        channel.ack(msg);
      },
      { noAck: false }
    );
  }).catch((ex) => console.log(ex)) ;

  // try {
  //   console.info("Consumer listening...!");
  //   const channel = await createChannel();
  //   await channel.consume(
  //     queueId,
  //     function (msg) {
  //       const rc = JSON.parse(msg.content.toString());
  //       // TODO: Check the type of the update we need to do
  //       // We define the message as follow { action: actionType, data: data, timestamp: date }
  //       // console.info(rc);
  //       switch (rc.action) {
  //         case "patch_flow":
  //           IdentityModel.patchIdentityFlows(rc.data.id, rc.data.body);
  //           break;
  //         case "patch_device":
  //           IdentityModel.patchIdentityDevices(rc.data.id, rc.data.body);
  //           break;
  //         case "patch_nodered_instance":
  //           IdentityModel.patchIdentityNodeRedInstance(
  //             rc.data.id,
  //             rc.data.body
  //           );
  //           break;
  //         default:
  //           console.warn("Unknown message action:", rc.action);
  //       }
  //       channel.ack(msg);
  //     },
  //     { noAck: false }
  //   );
  // } catch (e) {
  //   console.error("Consumer error:", e);
  //   throw e;
  // }
};
