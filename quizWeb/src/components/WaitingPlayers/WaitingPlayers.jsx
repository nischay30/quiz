import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ReactSpinner from 'react-spinjs';

const style = {
  height: '90%',
  width: '90%',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const progessStyle = {
	height:'20%',
	width:'40%',
	textAlign:'center',
	marginLeft:'30%',
	marginTop:'20%',
	marginBottom:'10%'
};

const configObject = {
  // a few sensible defaults
  width:22,
  radius: 30,
  length: 8,
  color:'#025D10'
  // color should not overwrite config
};

class WaitingPlayers extends Component {
	static get contextTypes() {
		return({
			router: React.PropTypes.object.isRequired,
			socket: React.PropTypes.object.isRequired
		});
	}

 	render() {
    return(
			<div style={{ textAlign: 'center' }}>
    		<Paper style={ style } zDepth={ 2 } >
    			<div style={ progessStyle }>
    				<h1>Please Wait for other Players</h1>
    				<Divider/>
    				<div style={{ width:'80%' }}>
      				<ReactSpinner config={ configObject } />
      			</div>
		    	</div>
    		</Paper>
    	</div>
   	);
	}
}

export default WaitingPlayers;
