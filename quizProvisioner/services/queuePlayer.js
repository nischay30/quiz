const client = require('./getRedisClient').duplicate();
const initializeQuiz = require('./initializeQuiz');

// Queue the player in the particular QuizQueue
function queuePlayer(playerName, quizId) {
	client.lpush('playerWaiting#' + quizId, playerName, (err, res) => {
		if(err) {console.log(err); return; }
		checkIfQuizExists(quizId);
	});
}

function checkIfQuizExists(quizId) {
	client.hsetnx('quiz', quizId, 1, (err, res) => {
		if(res !== 0) {
			setTimeout(initializeQuiz.bind(null, quizId), 10000);
		}
	});
}

module.exports = (playerInfo) => {
	const quizId = playerInfo.quizId;
	queuePlayer(playerInfo.socketId, quizId);
}
