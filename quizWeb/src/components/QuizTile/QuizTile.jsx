import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader } from 'material-ui/Card';
import { Grid, Col, Row} from 'react-flexbox-grid';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

  const timerStyle = {
    height: 100,
    width: 100,
    position:'fixed',
    textAlign: 'center',
    padding:33,
    top: '35%',
    right: '60.1%',
    color: 'red',
    backgroundColor: 'black',
    fontSize: 34
  }

 const cardheadstyle = {
   background:'#5D605C',
   textAlign:'center'
  }

  const title = {
    fontWeight: 'bold',
    fontSize:25
  }

  const buttonStyle = {
    margin:'5%',
    fontWeight: 'bold',
    width:'70%',
    color:'#DADADA'
  }

  const queStyle = {
    textAlign: 'Left',
    display: 'inline-block',
    marginTop:'15%',
    marginBottom:'50%',
    width:'100%'
  }

class QuizTile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: 6,
      showCircularProgress: false,
      open: false,
      playerInfo: [],
      questions: [],
      question: '',
      options: [],
      answer: '',
      quizEnd: false
    }
  }

  static get contextTypes() {
    return({
      router: React.PropTypes.object.isRequired,
      socket: React.PropTypes.object.isRequired
    });
  }

componentDidMount () {
    this.context.socket.on('question', (question) => {
      let tempQuestion = question.questions.shift();
      this.setState({
        question: tempQuestion.question,
        options: tempQuestion.options,
        answer: tempQuestion.answer,
        timer: tempQuestion.timer,
        questions: question.questions 
      });
      this.runTimer();
    });

    this.context.socket.on('scores', (scores) => {
      this.setState(scores);
    });
  }

  runTimer() {
    let ab = setInterval(() => {
    let timer = {
      timer: this.state.timer - 1
    }
    this.setState(timer);
      if(this.state.timer === 0) {
        console.log('entered');
        clearInterval(ab);
        this.handleNextQuestion();
      }
    }, 1000);
  }

  handleAnswer = (answeredIndex) => {
    if(answeredIndex + 1 === this.state.answer) {
      this.context.socket.emit('playerAnswered', this.props.quizId , 5);
    }
    else {
      this.context.socket.emit('playerAnswered', this.props.quizId, 0);
    }
    this.setState({showCircularProgress: true, open: true});
  }

  handleNextQuestion() {
    if(this.state.questions.length === 0) {
      this.setState({ quizEnd: true, showCircularProgress: false, open: false });
    }
    else {
      let tempQuestion = this.state.questions.shift();
      this.setState({
        question: tempQuestion.question,
        options: tempQuestion.options,
        answer: tempQuestion.answer,
        timer: tempQuestion.timer,
        showCircularProgress: false,
        open: false
      });
      this.runTimer();
    }
  }

  render() {
    const options = this.state.options.map((option, index) => {
      return (
        <Col key={ index } xs={ 6 }>
          <label key={ index }>
            <RaisedButton label={ option }
              key={ index }
              backgroundColor="#DADADA"
              labelStyle={{fontWeight: 'bold'}}
              style={ buttonStyle }
              onTouchTap={ this.handleAnswer.bind(this, index) }
            />
          </label>
        </Col>
      );
    });

    const question = () => {
      return(
        <Paper style={ queStyle } zDepth={ 3 }>
          <Card>
            <CardHeader title="Quiz Name" style={ cardheadstyle } titleStyle={ title } titleColor='white' subtitleColor='white'>
              <h2 style={{textAlign:'Right', marginTop:'0px', color: '#D32F2F', marginBottom:'0px'}}>
              </h2> 
            </CardHeader>
            <h3 style={{marginLeft:'2%'}}>
              { this.state.question }
            </h3>
            <Divider />
            <Row center='xs'>
             { options }
            </Row>
            <Divider />
          </Card>
        </Paper>
      );
    }

    const leaderboardRows = this.state.playerInfo.map((playerinfo, index) => {
      return(
        <TableRow key={ index }> 
           <TableRowColumn>{ index + 1 + '.'}</TableRowColumn> 
           <TableRowColumn>{ playerinfo.playerName }</TableRowColumn>
           <TableRowColumn>{ playerinfo.score }</TableRowColumn>
        </TableRow>
      );
    });

    const leaderboard = () => {
      return(
        <Table style={{width:'100%'}}>
          <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
            <TableRow style={{background:'#5D605C'}}>
              <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
                <h2 style={{color:'#FFFFFF'}}>
                  Leader Board
                </h2>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn >
                <h3 style={{color:'#034346'}}>
                  Sr NO.
                </h3>
              </TableHeaderColumn>
              <TableHeaderColumn >
                <h3 style={{color:'#034346'}}>
                  Name
                </h3>
              </TableHeaderColumn>
              <TableHeaderColumn >
                <h3 style={{color:'#034346'}}>
                  Points
                </h3>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={ false }>
            { leaderboardRows }
          </TableBody>
        </Table>
      );
    }

    const movingNextQuestion = () => {
      return(
        <Dialog
          title={
            <div> 
              <p style={{marginLeft: '30%'}}>
                Moving to the Next Question..
              </p>
              { this.state.showCircularProgress ?
                  <CircularProgress
                    style={{marginLeft: '44%'}}
                    size={ 60 }
                    thickness={ 8 }
                    /> 
                : 
                  null
              }
            </div> 
          }
          open={ this.state.open } 
        />
      );
    }

    const quizEnd = () => {
      return(
        <Dialog
          title={
            <p style={{textAlign: 'center', fontSize: 50, marginTop: 0}}> 
              Quiz Ended
            </p>
          }
          open={ this.state.quizEnd }
        >
        { leaderboard() }
        </Dialog>
      );
    }

    return(
      <div>
        { movingNextQuestion() }
        { quizEnd() }
        <Paper style={ timerStyle } zDepth={ 2 } circle={ true }>
          { this.state.timer }
        </Paper>
        <Grid >
          <Row>
            <Col xs={ 8 }>
              { question() }
            </Col>
            <Col xs={ 4 }>
              <Paper style={{width:'100%', marginTop:'30.5%'}} zDepth={ 3 }>
                { leaderboard() }
              </Paper>
            </Col>
          </Row>
        </Grid>
      </div>
   );
  }
}

export default QuizTile;
