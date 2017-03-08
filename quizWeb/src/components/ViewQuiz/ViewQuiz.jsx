import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';
import { Grid, Row, Col } from 'react-flexbox-grid';

import EditIcon from 'material-ui/svg-icons/action/update';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import PublishIcon from 'material-ui/svg-icons/editor/publish';

import request from 'superagent';

const config = require('../../config');
const styles = {
  buttonStyle: {
  	marginLeft:'10%',
    marginTop:'1%',
    marginBottom:'1%'
	}
}

class ViewQuiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quiz: [],
      noQuizDialog: false,
      publishedQuiz: false,
      publisheQuizText: ''
    }
  }

  static get contextTypes() {
    return({
      router: React.PropTypes.object.isRequired
    });
  }
  componentDidMount () {
    request
    .get(config.serverUrl + '/viewQuiz/' + localStorage.userName)
    .end((err, res) => {
        console.log(res);
      if(!res.body || res.body.length === 0) {
        this.setState({ noQuizDialog: true });
      }
      else {
        this.setState({ quiz: res.body });
      }
    });
  }

  handleDeleteQuiz = (trainingNumber) => {
    const url = `${config.serverUrl}/deleteQuiz/${localStorage.userName}/${trainingNumber}`;
    request
    .get(url)
    .end((err, res) => {
      this.setState({ quiz: res.body });
    })
  }

  handleClose = () => {
    this.setState({ noQuizDialog: false });
    this.context.router.push('/admin');
  }

  handlePublishClose = () => {
    this.setState({ publishedQuiz: false });
  }

  handlePublishQuiz = (trainingNumber) => {
    const url= `${config.serverUrl}/publishQuiz/${localStorage.userName}/${trainingNumber}`;
    request
    .get(url)
    .end((err, res) => {
      if(err) {
        this.setState({ publisheQuizText: `This Quiz is already published and link is ${res.body.link}`, publishedQuiz: true });
      }
      else {
        this.setState({ publisheQuizText: `Quiz Published and link is ${res.body.link}`, publishedQuiz: true });        
      }
    });
  }

  render() {

    const publishedQuiz = () => {
      const actions = [
        <FlatButton
          label='Ok'
          primary={ true }
          onTouchTap={ this.handlePublishClose }
        />
      ]
      return(
        <Dialog
          open={ this.state.publishedQuiz }
          title='Publishing Info'
          actions={ actions }
        >
          <Subheader> { this.state.publisheQuizText } </Subheader>
        </Dialog>
      );      
    }

    const noQuizDialog = () => {
      const actions = [
        <FlatButton
          label='Ok'
          primary={ true }
          onTouchTap={ this.handleClose }
        />
      ]
      return(
        <Dialog
          open={ this.state.noQuizDialog }
          title='Alert!!!'
          actions={ actions }
        >
          <Subheader> You have not created any Quiz yet </Subheader>
        </Dialog>
      );
    }

    const quizzes = this.state.quiz.map((quiz, index) => {
      const date = new Date(quiz.created);
      return(
        <Col key={ index } xs={ 6 }>
          <Paper key={ index } style={{ textAlign: 'center', width: '100%' }}>
            <h2 style={{ background: '#000000', textAlign: 'center', color: '#FFFFFF'}}>
            { quiz.quizName }
            </h2>
            <div style={{marginLeft: '20%', textAlign: 'left'}}>
              <h4>Created At: { date.toString() }</h4>
              <h4>Training Number: { quiz.trainingNumber }</h4>
            </div>
            <Divider style={{marginTop: '2%'}} />
            <div style={{textAlign:'center'}}>
              <RaisedButton
                title='Edit'
                disabled={ true }
                icon={ <EditIcon color='#F2F3F4'/> }
                style={ styles.buttonStyle }
                // buttonStyle={{ background: '#3498DB' }}
                labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
              />
              <RaisedButton
                title='Delete'
                icon={ <DeleteIcon color='#F2F3F4'/> }
                style={ styles.buttonStyle }
                buttonStyle={{ background: '#E74C3C' }}
                labelStyle={{ color:'#FFFFFF', fontWeight: 'bold' }}
                onTouchTap={ this.handleDeleteQuiz.bind(null, quiz.trainingNumber) }
              />
              <RaisedButton
                title='Publish'
                icon={ <PublishIcon color='#F2F3F4'/> }
                style={ styles.buttonStyle }
                buttonStyle={{ background: '#28B463' }}
                labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
                onTouchTap={ this.handlePublishQuiz.bind(null, quiz.trainingNumber) }
              />
            </div>
          </Paper>
        </Col>
      );
    });

    return(
      <Grid>
        <Row>
          { publishedQuiz() }
          { noQuizDialog() }
          { quizzes }
        </Row>
      </Grid>
   	);
  }
}

export default ViewQuiz
