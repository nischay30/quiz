const Router = require('express').Router();

const createQuiz = require('./createQuiz');
const saveQuiz = require('./saveQuiz');

Router.use(require('body-parser').json({limit: '50mb'}));
Router.use(require('body-parser').urlencoded({limit: '50mb', extended: true}));

Router.post('/createQuiz', createQuiz);
Router.post('/saveQuiz', saveQuiz);

module.exports = Router;
