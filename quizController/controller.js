const questionClient = require('./services/getRedisClient').duplicate();
const scoresClient = require('./services/getRedisClient').duplicate();
const sendQuestionToServer = require('./services/sendQuestionToServer');
const sendScoresToServer = require('./services/sendScoresToServer');
const updateScores = require('./services/updateScores');

function initializeController() {
	processMessage();
}

function processMessage () {
	getQuestionId();
	getPlayerId();
}

//This will wait to give the question for particular quiz
function getQuestionId() {
	questionClient.brpop('controllerInputQuestion', 0, (err, res) => {
		const quizId = res[1];
		sendQuestionToServer(quizId);
		setTimeout(initializeController);
	});
}

//THis will wait to update the score of any players
function getPlayerId() {
	console.log('Player info');
	scoresClient.brpop('controllerInputScore', 0, (err, res) => {
		const info = JSON.parse(res[1]);
		const playerId = info.playerId;
		const quizId = info.quizId;
		const scoreToIncrement = info.scoreToIncrement;
		updateScores(quizId, playerId, scoreToIncrement, sendScoresToServer);
		setTimeout(initializeController);
	});
}


initializeController();
