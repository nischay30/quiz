const Router = require('express').Router();

const createQuiz = require('./createQuiz');

Router.use(require('body-parser').json({limit: '50mb'}));
Router.use(require('body-parser').urlencoded({limit: '50mb', extended: true}));

Router.post('/createQuiz', createQuiz);

module.exports = Router;
