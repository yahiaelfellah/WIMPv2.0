const amqp = require('amqplib')
const { serverCfg, queueCfg} = require('./config')
const schema = 'amqp://'
const DeivceModel = require("../routes/models/devices.model");

/**
 *  Establish the connection with the RabbitMQ broker
 * @returns NULL
 */
async function initMQ() {
    try {
        let address = `${schema}${serverCfg.host}:${serverCfg.port}`
        let conn = await amqp.connect(address)
        //console.info(address)
        console.info("connect to RabbitMQ success");

        conn.on("error", function(err) {
            console.log(err);
            setTimeout(init, 10000);
        });

        conn.on("close", function() {
            console.error("connection to RabbitQM closed!");
            setTimeout(init, 10000);
        });

        let chan = await conn.createChannel()
        await chan.assertQueue(queueCfg.queueId)
        return chan
    }catch(e){
        console.log(e)
        console.error('init error!')
    }
}


/**
 * Function helps to send the data to the other microservice
 * @param {Object} message 
 */
exports.sender = async (message) => { 
    const channel = await initMQ()
    await channel.sendToQueue(
        queueCfg.queueId,
        Buffer.from(
            JSON.stringify({
                ...message,
                date:new Date()}
            )
        )
    )
}

/**
 * Helps to listen to the incomming messages 
 */
exports.consumer = async () => {
    try{
        console.info('consumer listening...!')
        const chan = await initMQ()
        await chan.consume(queueCfg.queueId, function(msg){
            //console.log(msg.content.toString())
            const rc = JSON.parse(msg.content.toString())
            switch(rc.action){
                case "patch_flow": 
                    DeivceModel.patchDeviceFlowId(rc.data.id, rc.data.body)
                    break;
            }            
            chan.ack(msg)
        }, { noAck: false })
    } catch(e) {
        console.log(String(e))
    }
}




