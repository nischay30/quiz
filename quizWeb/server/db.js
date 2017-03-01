const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/quiz';
mongoose.Promise = global.Promise;

mongoose.connect(mongoUrl, (err) => {
	if(err) { console.log('Err:', err); process.exit(-1); return; }
	console.log('Mongo is Connected');
});