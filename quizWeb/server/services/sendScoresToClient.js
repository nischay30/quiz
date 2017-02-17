module.exports = (scores, socket) => {
	socket.emit('scores', {playerInfo: JSON.parse(scores)});
}