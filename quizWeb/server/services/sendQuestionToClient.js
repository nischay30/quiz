module.exports = (question, socket) => {
	socket.emit('players', 'go');
	console.log(question);
	let obj = {
		questions: JSON.parse(question)
	}
	socket.emit('question', obj);
}