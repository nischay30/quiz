import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import {dark700, teal700} from 'material-ui/styles/colors';

import Login from './views/Login';
import QuizPlay from './views/QuizPlay';
import ContextComponent from './components/ContextComponent';
import WaitingScreen from './views/WaitingScreen';
import QuizCreations from './views/QuizCreations';
import CreateQuiz from './components/CreateQuiz';
import ViewQuiz from './components/ViewQuiz';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette:{
    textColor: teal700,
    primary1Color:  dark700,
    primary2Color: teal700
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={hashHistory}>
          <Route path='/' component={ Login } />
          <Route path='/quiz/:quizId' component={ ContextComponent } >
        	  <IndexRoute component={ WaitingScreen } />
            <Route path='/quiz/:quizId/play' component={ QuizPlay } />
          </Route>
          <Route path='/admin' component={ QuizCreations }>
            <Route path='quizCreate' component={ CreateQuiz }/>
            <Route path='quizView' component={ ViewQuiz } />
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
