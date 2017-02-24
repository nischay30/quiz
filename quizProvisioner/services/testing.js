// const initializeQuiz = require('./initializeQuiz')(123, ()=> {
// 	console.log('hi');
// });


const client = require('./getRedisClient');

const questions = [{
	question: "hi this is question1",
	options: ["option1", "option2", "option3", "option4"],
	timer: 5,
	answer: 2

},{
	question: "hi this is question2",
	options: ["option1", "option2", "option3", "option4"],
	timer: 5,
	answer: 2
},{
	question: "hi this is question3",
	options: ["option1", "option2", "option3", "option4"],
	timer: 5,
	answer: 2
},{
	question: "hi this is question4",
	options: ["option1", "option2", "option3", "option4"],
	timer: 5,
	answer: 2
},{
	question: "hi this is question5",
	options: ["option1", "option2", "option3", "option4"],
	timer: 5,
	answer: 2
},{
	question: "hi this is question25",
	options: ["option1", "option2", "option3", "option4"],
	timer: 6,
	answer: 2
}]


client.set('question#1', JSON.stringify(questions), (err, res) => {
	console.log(res);
});

client.set('question#2', JSON.stringify(questions), (err, res) => {
	console.log(res);
});

client.set('question#3', JSON.stringify(questions), (err, res) => {
	console.log(res);
});

client.set('question#4', JSON.stringify(questions), (err, res) => {
	console.log(res);
});

client.set('question#5', JSON.stringify(questions), (err, res) => {
	console.log(res);
});

