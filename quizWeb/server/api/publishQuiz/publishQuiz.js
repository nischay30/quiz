const client = require('../../services/getRedisClient').duplicate();
const setQuestionsToRedis = require('../../services/setQuestionsToRedis');
const schema = require('../../schemas/quiz.schema');
const async = require('async');

module.exports = (req, res) => {
	async.waterfall([
		getUserInfo.bind(null, req.params.userName),
		updateUserInfoForPublish.bind(null, req.params.userName, req.params.trainingNumber),
		readQuestionsFromMongo.bind(null, req.params.trainingNumber),
		setQuestionsToRedis.bind(null, req.params.trainingNumber)
		], (err, results) => {
		if(err) { res.sendStatus(400); return ;}
		res.json({
			link: 'localhost:3000/#/quiz/'+ req.params.trainingNumber,
		});
	});
}

function readQuestionsFromMongo(trainingNumber, callback) {
	schema.quizSchema.findOne({ trainingNumber: trainingNumber}, (err,res) => {
		if(err) { callback(err); return; }
		let questions = res.questions;
		for(let i=0; i< questions.length; i++) {
			let tempObject = questions[i].toObject();
			tempObject.timer = res.time;
			questions[i] = tempObject;
		}
		callback(null, questions);
	});
}

function getUserInfo(userName, callback) {
	schema.userSchema.findOne({userName: userName}, (err, response) => {
		if(err) { callback(err); return; }
		const trainingNumbers = response.quiz;
		callback(null, trainingNumbers);
	});
}

function updateUserInfoForPublish(userName, trainingNumberToBeUpdated, trainingNumbers, callback) {
	let flag = true;
	for(let i = 0; i < trainingNumbers.length; i++) {
		if(trainingNumbers[i].trainingNumber === trainingNumberToBeUpdated) {
			if(trainingNumbers[i].published) {
				flag = true;
				break;
			} else {
				let tempObject = trainingNumbers[i];
				tempObject.published = true;
				trainingNumbers[i] = tempObject;
				flag = false;
				break;
			}
		}
	}
	if(flag) {
		callback(true);
	} else {
			schema.userSchema.updateOne({ userName: userName }, { quiz: trainingNumbers }, (err, results) => {
			if(err) { callback(err); return; }
			callback(null);
		});
	}
}
