import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import QuizBanner from '../../../images/QuizBanner.png';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  textAlign: 'center',
  display: 'inline-block',
  width:'40%',
  height:'50%',
};

const cardheadstyle={
  background:'#242323',
  textAlign:'center'

};
const cardTitleStyle={
   color:'#FFFFFF',
   fontSize:'125%',
   fontWeight:'bold'
};

class LoginComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  static get contextTypes() {
    return{
      router: React.PropTypes.object.isRequired
    }
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem('userName', this.state.email); 
    this.setState({email: '', password: ''});
    this.context.router.push('/admin');
  }

	render() {
		return(
      <div  style={{textAlign:'center',marginTop:"7%"}}>
        <img src={QuizBanner} style={{postion:'fixed',margin:'auto',width:400,height:'auto'}}/>
        <h1 style={{fontWeight:'bold',marginTop:'0'}}>
          Quiz Time
        </h1>
      <Paper style={ style }>
        <Card style={{background:'#E5E4E2', marginTop:'0'}}>
          <CardHeader title="Please sign in to your account" style={cardheadstyle} titleStyle={cardTitleStyle} />
          <CardText>
            <form onSubmit={ this.handleLogin }>
              <TextField
               hintText="Enter your Email Id"
               type='email'
               value={ this.state.email }
               required
               hintStyle={{fontWeight:'bold'}}
               underlineStyle={{borderColor:'#37861E'}}
               onChange={ this.handleEmailChange }
              />
              <br />
              <TextField
               hintText="Enter your Password"
               type='password'
               value={ this.state.password }
               required
               hintStyle={{fontWeight:'bold'}}
               underlineStyle={{borderColor:'#37861E'}}
               onChange={ this.handlePasswordChange }
              />
              <br />
              <RaisedButton
              label="Login"
              type='submit'
              backgroundColor='#1C6D03'
              labelStyle={{color:'#FFFFFF', fontWeight:'bold'}}
              />
            </form>
          </CardText>
        </Card>
      </Paper>
		</div>);
	}
}

export default LoginComponent;
