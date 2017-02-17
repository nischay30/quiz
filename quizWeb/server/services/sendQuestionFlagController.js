const client = require('./getRedisClient').duplicate();

module.exports = (quizId) => {
	client.lpush('controllerInputQuestion', quizId, (err, res) => {
		if(err) {console.log(err); return;}
		console.log('Question Flag Sent');
	});
}