const client = require('./getRedisClient').duplicate();

module.exports = (quizId, playerId, scoreToIncrement, callback) => {
	client.hincrby('scores#' + quizId, playerId, scoreToIncrement, (err, res) => {
		if(err) { console.log('Err:', err); return; }
		callback(quizId);
	});
}
