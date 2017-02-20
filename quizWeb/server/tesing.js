const subscribeClient = require('./services/getRedisClient').duplicate();

subscribeClient.subscribe('question#' + 123);

subscribeClient.on('message', (channel, data, sdfsd) => {
	console.log(channel);
	console.log(data);
	console.log(sdfsd);
});
