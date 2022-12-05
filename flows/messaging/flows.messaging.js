const amqplib = require('amqplib');
const rxjs = require('rxjs');
const AMQP_SERVER  = process.env.AMQP_SERVER || 'amqp://localhost:5672';
const CHANNEL_NAME = process.env.CHANNEL_NAME || 'user';
const currentChannel = new rxjs.BehaviorSubject(null);
const currentConnection = new rxjs.BehaviorSubject(null);

connect = async() => {
    console.log('connecting to the RabbitMQ broker');
    const connection = await amqplib.connect(AMQP_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue(CHANNEL_NAME);
    currentConnection.next(connection);
    currentChannel.next(channel);
} 
exports.broker = {
    connect,
    currentChannelObservable : currentChannel.asObservable(),
    currentConnectionObservable: currentConnection.asObservable(),
    get currentChannelValue() { return currentChannel.value },
    get curretConnectionValue() { return currentConnection.value}

}





