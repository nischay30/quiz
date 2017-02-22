import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import {dark700, teal700} from 'material-ui/styles/colors';

import QuizPlay from './views/QuizPlay';
import ContextComponent from './components/ContextComponent';
import WaitingScreen from './views/WaitingScreen';

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
