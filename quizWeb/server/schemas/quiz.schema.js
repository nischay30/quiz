const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quiz = new Schema({
  trainingNumber: { type: 'String', required: true, unique: true },
	quizName: { type: String, requried: true },
  questions: [{
  	answer: { type: String, required: true },
  	question: { type: String, required: true },
    index: { type: Number, required: 'true' },
  	options: []
  }],
  time: { type: Number, required: 'true' }
});

const user = new Schema({
  userName: { type: 'String', required: true, unique: true },
  quiz:[{
    trainingNumber: { type: String, required: true },
    created: { type: Date, default: Date.now },
    quizName: { type: String, required: true },
    published: { type: Boolean, default: false }
  }]
});

module.exports = {
  quizSchema: mongoose.model('quiz', quiz),
  userSchema: mongoose.model('user', user)
};