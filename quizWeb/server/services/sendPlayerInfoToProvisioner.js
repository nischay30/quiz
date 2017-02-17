const client = require('./getRedisClient').duplicate();

module.exports = (quizId, socketId) => {
	const obj = {
		quizId: quizId,
		socketId: socketId
	}
	client.lpush('queuedPlayers', JSON.stringify(obj), (err, res)=> {
		console.log(res);
	});
}
