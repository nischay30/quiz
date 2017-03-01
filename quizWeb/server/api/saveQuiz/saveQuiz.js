const schema = require('../../schemas/quiz.schema');
const async = require('async');

module.exports = (req, res)=> {
	let payload = req.body.tempObject;
	const trainingNumber = payload.trainingNumber;
	const userName = payload.userName;
	const quizName = payload.quizName;
	delete payload.userName;
	async.series([
		saveQuiz.bind(null, payload),
		checkIfUserExists.bind(null, userName, trainingNumber, quizName)
		], (err, results) => {
		if(err) { res.json(err); return; }
		res.json(results.shift());
	});
}

function saveQuiz(payload, callback) {
	const quiz = new schema.quizSchema(payload);
	quiz.save((err, res1) => {
		if(err) {
			if(err.code === 11000) {
				let tempObject = {
					titleQuizSaved: 'Error',
					messageQuizSaved: 'Quiz Already Exists with this Training Id',
					quizSavedState: true
				};
				callback(tempObject);
			}
			else {
				let tempObject = {
					titleQuizSaved: 'Error',
					quizSavedState: true,
					messageQuizSaved: 'Please Try Again!!!'
				};
				callback(tempObject);
			}
		}
		else {
			let tempObject = {
				quizSavedState: true,
				titleQuizSaved: 'Quiz Created Successfully...',
				messageQuizSaved: 'Go to View Section to Check it'
			};
			callback(null, tempObject);			
		}
	});
}

function createNewUser(userName, trainingNumber, quizName, callback) {
	const tempObject = {
		userName: userName,
		quiz: [{
			trainingNumber: trainingNumber,
			created: new Date(),
			quizName: quizName
		}]
	}
	const user = new schema.userSchema(tempObject);
	user.save((err, res1) => {
		if(err) { callback(err);  return; }
		callback(null);
	});
}

function updateUser(userName, trainingNumbers, callback) {
	schema.userSchema.updateOne({ userName: userName }, { quiz: trainingNumbers }, (err, results) => {
		if(err) { callback(err); return; }
		callback(null);
	});
}

function checkIfUserExists(userName, trainingNumber, quizName, callback) {
	schema.userSchema.findOne({userName: userName}, (err, response) => {
		if(err) {callback(err); return; }
		if(response) {
			let trainingNumbers = response.quiz;
			trainingNumbers.push({
				trainingNumber: trainingNumber,
				created: new Date(),
				quizName: quizName
			});
			updateUser(userName, trainingNumbers, callback);
		}
		else {
			createNewUser(userName, trainingNumber, quizName, callback);
		}
	});
}
