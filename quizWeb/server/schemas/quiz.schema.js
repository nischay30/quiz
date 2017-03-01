const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quiz = new Schema({
	quizName: { type: 'String', requried: true },
  questions: [{
  	answer: { type: 'String', required: true },
  	question: { type: 'String', required: true },
    index: { type: 'Number', required: 'true' },
  	options: []
  }],
  time: { type: 'Number', required: 'true' },
  trainingNumber: { type: 'String', required: true, unique: true }
});

const user = new Schema({
  userName: { type: 'String', required: true, unique: true },
  quiz:[]
});

module.exports = {
  quizSchema: mongoose.model('quiz', quiz),
  userSchema: mongoose.model('user', user)
};