module.exports = (http) => {
	const io = require('socket.io')(http);
	io.on('connection', (socket) => {
		socket.on('message', (quizId) => {
			require('./services/sendPlayerInfoToProvisioner')(quizId.quizId, socket.conn.id);
		});
		console.log("Socket is connected");
	});
}

