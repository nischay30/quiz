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
		sortPlayerScores(players, quizId, publishToServer);
	});
}

function sortPlayerScores(playerInfo, quizId, callback) {
	const sortedPlayers = playerInfo.sort((player1, player2) => {
		return (player2.score - player1.score);
	});
	send10PlayersInfo(sortedPlayers, quizId, callback);
}

function send10PlayersInfo(sortedPlayers, quizId, callback) {
		const slicedPlayers = sortedPlayers.slice(0, 10);
		callback(slicedPlayers, quizId);
}

function publishToServer(players, quizId) {
	publishClient.publish('scores#' +quizId, JSON.stringify(players));
}
