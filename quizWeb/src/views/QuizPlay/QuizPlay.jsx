import React, { Component } from 'react';
import QuizTile from '../../components/QuizTile';

class QuizPlay extends Component {
	render() {
		return (
				<QuizTile quizId={this.props.params.quizId}/>
			);
	}
}

export default QuizPlay;