const schema = require('../../schemas/quiz.schema');
const async = require('async');

module.exports = (req, res, next) => {
	async.waterfall([
		deleteQuizInfo.bind(null, req.params.trainingNumber),
		getUserInfo.bind(null, req.params.userName),
		deleteQuizFromUserDetails.bind(null, req.params.trainingNumber),
		updateUser.bind(null, req.params.userName)		
	], (err, results) => {
		if(err) { console.log('Err:', err); return; }
		next();
	});
}

function deleteQuizInfo(trainingNumber, callback) {
	schema.quizSchema.remove({trainingNumber: trainingNumber}, (err, res) => {
		if(err) { callback(err); return; }
		callback(null);
	});
}

function getUserInfo(userName, callback) {
	schema.userSchema.findOne({userName: userName}, (err, response) => {
		if(err) { callback(err); return; }
		const trainingNumber = response.quiz;
		callback(null, trainingNumber);
	});
}

function deleteQuizFromUserDetails(trainingNumberToBeDeleted, trainingNumbers, callback) {
	for(let i=0; i< trainingNumbers.length; i++) {
		if(trainingNumbers[i].trainingNumber === trainingNumberToBeDeleted) {
			trainingNumbers.splice(i, 1);
			callback(null, trainingNumbers);
		}
	}
}

function updateUser(userName, trainingNumbers, callback) {
	schema.userSchema.updateOne({ userName: userName }, { quiz: trainingNumbers }, (err, results) => {
		if(err) { callback(err); return; }
		callback(null);
	});
}
