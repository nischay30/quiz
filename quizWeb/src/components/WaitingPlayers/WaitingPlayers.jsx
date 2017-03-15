import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ReactSpinner from 'react-spinjs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  height: '100%',
  width: '90%',
  marginTop:'7%',
  textAlign: 'center',
  display: 'inline-block',
};

const progessStyle = {
  height:'20%',
  width:'40%',
  textAlign:'center',
  marginLeft:'30%',
  marginTop:'10%',
  marginBottom:'10%'
};

const configObject = {
  // a few sensible defaults
  width:22,
  radius: 20,
  length: 8,
  color:'#025D10',
  marginTop:'20%' 
  // color should not overwrite config
};

class WaitingPlayers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }
  static get contextTypes() {
    return({
      router: React.PropTypes.object.isRequired,
      socket: React.PropTypes.object.isRequired
    });
  }

  handleForm = (event) => {
    event.preventDefault();
    localStorage.setItem('userName', this.state.text);
  }

  handleName = (event) => {
    this.setState({ text: event.target.value});
  console.log(this.props.params.quizId);
  }

  render() {
    return(
      <div style={{ textAlign: 'center' }}>
        <Paper style={ style } zDepth={ 2 } >
          <div style={ progessStyle }>
            <h1>Please Wait for other Players</h1>
            <Divider/>
            <form onSubmit={ this.handleForm } >
              
              <TextField
                 hintText="Enter Your Name"
                 floatingLabelText="Enter Your Name Here"
                 value={this.state.text}
                 onChange={this.handleName}
              /><br />
              <RaisedButton label="Submit" primary={true} type="submit"  />
            </form>
           
            
              <ReactSpinner config={ configObject } />
        
            
          </div>

        </Paper>
      </div>
    );
  }
}

export default WaitingPlayers;
