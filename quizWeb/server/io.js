const subscribeClient = require('./services/getRedisClient').duplicate();

const sendQuestionFlagController = require('./services/sendQuestionFlagController');
const sendScoreFlagController = require('./services/sendScoreFlagController');

const sendQuestionToClient = require('./services/sendQuestionToClient');
const sendScoresToClient = require('./services/sendScoresToClient');

module.exports = (http) => {
	const io = require('socket.io')(http);
	subscribeClient.subscribe('events');
	subscribeClient.on('message', (channel, message) => {
		switch(channel) {
			// in this case message is quizId
			case 'events': sendQuestionFlagController(message);
										 break;
		}
	});

	io.on('connection', (socket) => {
	const personalClient = require('./services/getRedisClient').duplicate();

		socket.on('message', (quizId) => {
		personalClient.subscribe('question#' + quizId.quizId);
		personalClient.subscribe('scores#' + quizId.quizId);
			require('./services/sendPlayerInfoToProvisioner')(quizId.quizId, socket.conn.id);
		});

		// This will fetch the next question from Redis
		socket.on('nextQuestion', (quizId) => {
			sendQuestionFlagController(quizId);
		});

		// This will update the score in the leaderboard as soon as anyone answers
		socket.on('playerAnswered', (quizId, scoreToIncrement) => {
			sendScoreFlagController(quizId, socket.conn.id, scoreToIncrement);
		});

		personalClient.on('message', (channel, message) => {
			console.log('Channel', channel);
			console.log('message', message);

			if(channel.match(new RegExp('question#*')))
				 sendQuestionToClient(message, socket);
				// in this case message will be scores
				else 
					sendScoresToClient(message, socket);
		});
	});
}

