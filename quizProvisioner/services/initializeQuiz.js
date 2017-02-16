const client = require('./getRedisClient').duplicate();
const async = require('async');

module.exports = (quizId) => {
	async.parallel([
		getAllPlayersFromQueue.bind(null, quizId),
		getQuestions.bind(null ,quizId)
		], (err, results) => {
			mapPlayerScores(quizId, results[0]);
	});
}

function getAllPlayersFromQueue(quizId, callback) {
	client.lrange('playerWaiting#' + quizId, 0, -1, (err, players)=> {
		callback(null, players);
	});
}

function getQuestions(quizId, callback) {
	client.get('question#' + quizId, (err, questions) => {
		setQuestionsInQueue(quizId, JSON.parse(questions), callback);
	});
}

function setQuestionsInQueue(quizId, questions, callback) {
	async.each(questions, (question, internalCallback) => {
		client.lpush('questions#' + quizId, JSON.stringify(question), (err, res) => {
			if(err) {callback(err); return;}
			internalCallback(null);
		});
	}, callback);
}

// Initialzie Players scores to Zero
function mapPlayerScores(quizId, players) {
	async.each(players, (playerName, internalCallback) => {
		client.hset('scores#' + quizId, playerName, 0, (err, res) => {
			if(err) { console.log(err); return; }
			internalCallback(null);
		});
	});
}
