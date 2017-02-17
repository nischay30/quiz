const client = require('./getRedisClient').duplicate();

module.exports = (quizId, playerId, scoreToIncrement) => {
	const playerInfo = {
		 playerId: playerId,
		 quizId: quizId,
		 scoreToIncrement: scoreToIncrement
	}
	client.lpush('controllerInputScore', JSON.stringify(playerInfo), (err, res) => {
		if(err) {console.log(err); return;}
		console.log('Score Flag Sent');
	});
}