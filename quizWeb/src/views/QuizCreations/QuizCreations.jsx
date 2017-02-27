import React, { Component } from 'react';
import HomeAppBar from '../../components/HomeAppBar';

class QuizCreations extends Component {
	render() {
		return(
			<div>
				<HomeAppBar />
				{ this.props.children }
			</div>
		);
	}
}

export default QuizCreations;
