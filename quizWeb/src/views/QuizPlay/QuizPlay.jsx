import React, { Component } from 'react';
import QuizTile from '../../components/QuizTile';
import Background from '../../../images/Background.jpg';

class QuizPlay extends Component {
	render() {
		return (
      <div style={{ backgroundImage: `url(${Background})`, backgroundRepeat:'no-repeat', backgroundAttachment:'fixed', width:'100%', height:'100%'}}>
				<QuizTile quizId= {this.props.params.quizId}/>
			</div>	
			);
	}
}

export default QuizPlay;