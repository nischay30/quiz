import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Subheader from 'material-ui/Subheader';
import { Grid, Row, Col } from 'react-flexbox-grid';

import EditIcon from 'material-ui/svg-icons/action/update';
import DeleteTcon from 'material-ui/svg-icons/action/delete';
import PublishTcon from 'material-ui/svg-icons/editor/publish';

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
      noQuizDialog: false
    }
  }

  componentDidMount () {
    request
    .get(config.serverUrl + '/viewQuiz/' + localStorage.userName)
    .end((err, res) => {
      if(!res.body) {
        console.log(res.body);
        this.setState({ noQuizDialog: true });
      }
      else {
        this.setState({ quiz: res.body});
      }
    });
  }

  handleDeleteQuiz = (trainingNumber) => {
    request
    .get(config.serverUrl + '/deleteQuiz/'+ localStorage.userName + '/' + trainingNumber)
    .end((err, res) => {
      console.log(res);
      this.setState({ quiz: res.body });
    })
  }

  render() {
    const noQuizDialog = () => {
      return(
        <Dialog
          open={ this.state.noQuizDialog }
          title='Alert!!!'
        >
          <Subheader> You have not created any Quiz yet </Subheader>
        </Dialog>
      );
    }

    const quizzes = this.state.quiz.map((singleQuiz, index) => {
      const date = new Date(singleQuiz.created);
      return(
        <Col xs={6}>
          <Paper key={ index } style={{textAlign: "center", width: '100%'}}>
            <h2 style={{background:'#000000', textAlign: 'center', color: '#FFFFFF'}}>
            { singleQuiz.quizName }
            </h2>
            <div style={{marginLeft: '20%'}}>
              <h4>Created At: { date.toString() }</h4>
              <h4>Training Number { singleQuiz.trainingNumber }</h4>
            </div>
            <Divider style={{marginTop:'2%'}}/>
            <div style={{textAlign:'center'}}>
              <RaisedButton icon={<EditIcon color='#F2F3F4'/>} style={styles.buttonStyle}  buttonStyle={{background:'#3498DB'}}  labelStyle={{color:'#FFFFFF',fontWeight:'bold'}}> </RaisedButton>
              <RaisedButton
                icon={<DeleteTcon color='#F2F3F4'/>}
                style={styles.buttonStyle}
                buttonStyle={{background:'#E74C3C'}}
                labelStyle={{color:'#FFFFFF',fontWeight:'bold'}}
                onTouchTap={ this.handleDeleteQuiz.bind(null, singleQuiz.trainingNumber) } >
              </RaisedButton>
              <RaisedButton icon={<PublishTcon color='#F2F3F4'/>} style={styles.buttonStyle} buttonStyle={{background:'#28B463'}} labelStyle={{color:'#FFFFFF',fontWeight:'bold'}} > </RaisedButton>
            </div>
          </Paper>
        </Col>
      );
    });

    return(
      <Grid> 
        <Row>
          { noQuizDialog() }
          { quizzes }
        </Row>
      </Grid>
      
   	);
  }
}

export default ViewQuiz
