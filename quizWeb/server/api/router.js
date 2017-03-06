const Router = require('express').Router();

const convertCsv = require('./convertCsv');
const saveQuiz = require('./saveQuiz');
const viewQuiz = require('./viewQuiz');
const deleteQuiz = require('./deleteQuiz');

Router.use(require('body-parser').json({limit: '50mb'}));
Router.use(require('body-parser').urlencoded({limit: '50mb', extended: true}));

Router.post('/convertCsv', convertCsv);
Router.post('/saveQuiz', saveQuiz);
Router.get('/viewQuiz/:userName', viewQuiz);
Router.get('/deleteQuiz/:userName/:trainingNumber', deleteQuiz, viewQuiz);

module.exports = Router;
