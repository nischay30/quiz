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
  };

  handleClose = () => {
    this.props.close();
  };

 render() {
  function getOptions(inputOptions, answer) {
    const options = inputOptions.map((option, index) => {
      let color = false;
      if(option.hasOwnProperty(answer)) {
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
            { Object.values(option)[0] }
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
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label="Save"
        primary={ true }
        onTouchTap={ this.handleClose }
      />,
    ];

  return(
    <Paper style={ style }>
      <Dialog
        title='Preview Of Quiz'
        titleStyle={{ textAlign: 'center', fontWeight: 'bold', color:'#ffffff', backgroundColor: '#447e4a'}}
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
