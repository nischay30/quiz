const schema = require('../../schemas/quiz.schema');

module.exports = (req, res) => {
	findQuiz(req.params.userName, res);
}

function findQuiz(userName, res) {
	schema.userSchema.find({ userName: userName}, (err, results) => {
		if(err) { console.log(err); return; }
		if(results.length === 0 ) {
			res.json(null);
		}
		else {
			res.json(results[0].quiz);
		}
	});
}
