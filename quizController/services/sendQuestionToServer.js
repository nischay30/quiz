const client = require('./getRedisClient').duplicate();
const publishClient = require('./getRedisClient').duplicate();

module.exports = (quizId) => {
	client.rpop('questions#' + quizId, (err, res) => {
		console.log('res', res);
		publishClient.publish('question', res);
	});
}
