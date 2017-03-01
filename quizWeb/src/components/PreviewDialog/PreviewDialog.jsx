import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader } from 'material-ui/Card';
import { Col, Row} from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';


const welcomeStyle= {
  background:'#2F3A30',
  marginTop:0,
  marginLeft:0,
  marginRight:0,
  marginBottom:0,
  height:"20%"
}

const style = {
  textAlign: 'center',
  height:'90%'
};

class PreviewDialog  extends Component {

  state = {
    open: false,
  }

  handleSave = () => {
    const quizName = this.props.quizName;
    const trainingNumber = this.props.trainingNumber;
    const time = this.props.time;
    const questions = this.props.questions;
    this.props.save(quizName, trainingNumber, time, questions);
  }

  render() {
    function getOptions(inputOptions, answer) {
      const options = inputOptions.map((option, index) => {
        let color = false;
        if(option === answer) {
          color = true;
        }
        return(
          <Col key={ index} xs={ 6 }>
            <Chip
              backgroundColor={ color ? '#77CC4F': null }
              style={{ margin: '2%' }}
              labelStyle={{ color:'#000000', fontWeight:'bold' }}
            >
              <Avatar backgroundColor='#226901' size={ 32 }>{ index + 1 }</Avatar>
              { option }
            </Chip>
          </Col>
        );
      });
      return options;
    }

    const questions = this.props.questions.map((question, index) => {
      return(
        <div key={ index } style={{ marginBottom: 20, marginTop: 20 }}>
          <Card>
            <CardHeader
              style={ welcomeStyle }
              title={
                <div>
                  <span style={{fontWeight:'bold',color:'#52fff5'}}>
                    Ques.  { index + 1 }  
                  </span> 
                  <span style={{marginLeft: 14, fontSize: 20, color: '#adfade'}}>
                    { question.question }
                  </span>
                </div>
              }            
            />
            <Row center='xs' style={{ marginLeft:'3%' }} >
            { getOptions(question.options, question.answer) }
            </Row>
          </Card>
          <Divider/>
        </div>
      );
    });

    const actions = [
        <FlatButton
          label="Cancel"
          primary={ true }
          onTouchTap={ this.props.cancel }
        />,
        <FlatButton
          label="Save"
          primary={ true }
          onTouchTap={ this.handleSave.bind(this) }
        />
      ];

    return(
      <Paper style={ style }>
        <Dialog
          title={
            <div>
              <span style={{float: 'left'}}>
                #{ this.props.trainingNumber }
              </span>
              <span style={{marginLeft: '45%'}}>
                { this.props.quizName }
              </span>
              <span style={{float: 'right'}}>
                Time/Ques: { this.props.time } seconds
              </span>
            </div>
          }
          titleStyle={{ fontWeight: 'bold', color:'#ffffff', backgroundColor: '#447e4a'}}
          contentStyle={{ width: '90%', maxWidth: 'none' }}
          actions={ actions }
          modal={ false }
          open={ this.props.open }
          onRequestClose={ this.handleClose }
          autoScrollBodyContent={ true }
        >
          <div style={{ height: '90%' }}>
            { questions }
          </div>
        </Dialog>
      </Paper>
    );
  }
}

export default PreviewDialog;
