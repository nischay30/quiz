const redis = require('redis');
const subscribeClient = redis.createClient(6379, 'localhost');

const sendQuestionFlagController = require('./services/sendQuestionFlagController');
const sendScoreFlagController = require('./services/sendScoreFlagController');

const sendQuestionToClient = require('./services/sendQuestionToClient');
const sendScoresToClient = require('./services/sendScoresToClient');

module.exports = (http) => {
	const io = require('socket.io')(http);
	subscribeClient.subscribe('events');
	subscribeClient.subscribe('question');
	subscribeClient.subscribe('scores');

	subscribeClient.on('message', (channel, message) => {
		switch(channel) {
			// in this case message is quizId
			case 'events': sendQuestionFlagController(message);
										 break;
		}
	});

	io.on('connection', (socket) => {
		socket.on('message', (quizId) => {
			require('./services/sendPlayerInfoToProvisioner')(quizId.quizId, socket.conn.id);
		});

		// This will fetch the next question from Redis
		socket.on('nextQuestion', (quizId) => {
			console.log('Next question needed');
			sendQuestionFlagController(quizId);
		});

		// This will update the score in the leaderboard as soon as anyone answers
		socket.on('playerAnswered', (quizId, scoreToIncrement) => {
			sendScoreFlagController(quizId, socket.conn.id, scoreToIncrement);
		});

		subscribeClient.on('message', (channel, message) => {
			switch(channel) {
				// in this case message will be question
				case 'question': sendQuestionToClient(message, socket)
	    									 break;
				// in this case message will be scores
				case 'scores': sendScoresToClient(message, socket)
	   									 break;
			}
		});
	});
}

