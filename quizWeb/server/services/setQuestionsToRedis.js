const client = require('./getRedisClient').duplicate();

module.exports = (trainingNumber, questions, callback) => {
	client.set('question#' + trainingNumber, JSON.stringify(questions), (err, res) => {
		callback(null);
	});
}
