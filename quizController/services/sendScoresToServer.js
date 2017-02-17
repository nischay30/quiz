const client = require('./getRedisClient').duplicate();
const publishClient = require('./getRedisClient').duplicate();

module.exports = (quizId) => {
	client.hgetall('scores#' + quizId, (err, res) => {
		let playerIds = Object.keys(res);
		let players = [];
		for(let i = 0 ; i < playerIds.length; i = i + 1) {
			const playerInfo = {
				playerName: playerIds[i],
				score: res[playerIds[i]]
			}
			players.push(playerInfo);
		}
		publishClient.publish('scores', JSON.stringify(players));
	});
}
