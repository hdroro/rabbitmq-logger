const amqp = require("amqplib");
const config = require("./config");

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel on that connection
//step 3 : Create the exchange
//step 4 : Publish the message to the exchange with a routing key

const createChannel = async () => {
    const connection = await amqp.connect(config.rabbitMQ.url);
    return await connection.createChannel();
};

const publishMessage = async (routingKey, message) => {
    const exchangeName = config.rabbitMQ.exchangeName;
    const channel = await createChannel();
    channel.assertExchange(exchangeName, "direct");

    const logDetails = {
        logType: routingKey,
        message: message,
        dateTime: new Date(),
    };
    channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(logDetails))
    );

    console.log(`The new ${routingKey} log is sent to exchange ${exchangeName}`);
};

module.exports = publishMessage;
