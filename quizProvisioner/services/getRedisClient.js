const redis = require('redis');
const redisPort = process.env.REIDS_PORT || 6379;
const redisHost = process.env.REDIS_HOST || 'localhost';

const client = redis.createClient(redisPort, redisHost);

client.on('error', (err) => {
	console.log('There is some error in connecting redis', err);
});

client.on('ready', () => {
	console.log('Redis Client is ready');
});

client.on('connect',() => {
	console.log('Client is connected to redis');
});

module.exports = client;
