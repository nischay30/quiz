import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import request from 'superagent';
import { Router, Route, hashHistory } from 'react-router';
import QuizPlay from './views/QuizPlay';

injectTapEventPlugin();

class App extends Component {

  render() {
    return (
     <MuiThemeProvider>
      <Router history={hashHistory}>
        <Route path='/' component={QuizPlay} />
      </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
