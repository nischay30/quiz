const schema = require('../../schemas/quiz.schema');
module.exports = (req, res)=> {
	const payload = req.body.tempObject;
	const quiz = new schema.quizSchema(payload);
	quiz.save((err, res1) => {
		if(err) { 
			if(err.code === 11000) {
				res.json({
					titleQuizSaved: 'Error',
					messageQuizSaved: 'Quiz Already Exists with this Training Id',
					quizSavedState: true
				});
			}
			else {
				res.json({
					titleQuizSaved: 'Error',
					quizSavedState: true,
					messageQuizSaved: 'Please Try Again!!!'
				});
			}
			return ;
		}
		res.json({
			quizSavedState: true,
			titleQuizSaved: 'Quiz Created Successfully...',
			messageQuizSaved: 'Go to View Section to Check it'
		});
	});
}
