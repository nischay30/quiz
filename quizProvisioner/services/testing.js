// const initializeQuiz = require('./initializeQuiz')(123, ()=> {
// 	console.log('hi');
// });


const client = require('./getRedisClient');

const questions = [{
	question: "Which of the following Blockchains does not do mining?",
	options: ["Ethereum", "Hyperledger", "Bitcoin", "None of the Above"],
	timer: 5,
	answer: 2

},{
	question: "Which of the following Blockchains does not do mining?",
	options: ["Ethereum", "Hyperledger", "Bitcoin", "None of the Above"],
	timer: 5,
	answer: 2
},{
	question: "Which of the following Blockchains does not do mining?",
	options: ["Ethereum", "Hyperledger", "Bitcoin", "None of the Above"],
	timer: 5,
	answer: 2
},{
	question: "Which of the following Blockchains does not do mining?",
	options: ["Ethereum", "Hyperledger", "Bitcoin", "None of the Above"],
	timer: 5,
	answer: 2
},{
	question: "Which of the following Blockchains does not do mining?",
	options: ["Ethereum", "Hyperledger", "Bitcoin", "None of the Above"],
	timer: 5,
	answer: 2
},{
	question: "Which of the following Blockchains does not do mining?",
	options: ["Ethereum", "Hyperledger", "Bitcoin", "None of the Above"],
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

