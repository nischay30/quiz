import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import QuizPlay from './views/QuizPlay';
import ContextComponent from './components/ContextComponent';
import WaitingScreen from './views/WaitingScreen';

injectTapEventPlugin();

class App extends Component {

  render() {
    return (
     <MuiThemeProvider>
      <Router history={hashHistory}>
        <Route path='/:quizId' component={ContextComponent} >
        	<IndexRoute component={WaitingScreen} />
          <Route path='/:quizId/quiz' component={QuizPlay} /> 
       </Route>
      </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
