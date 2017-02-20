import React, { Component } from 'react';

class ContextComponent extends Component {

	constructor() {
		super();
		const config = require('../../config');
		// eslint-disable-next-line
		let socket = io(config.serverUrl);
		socket.on('connect', () => {
					socket.send({quizId: this.props.params.quizId});
		});
		this.state = {
			socket: socket,
			serverUrl: config.serverUrl
		}
	}

	static get childContextTypes() {
		return ({
			socket: React.PropTypes.object,
			serverUrl: React.PropTypes.string
		});
	}

	static get contextTypes() {
		return({
			router: React.PropTypes.object.isRequired
		});
	}

	static get propTypes() {
		return({
			children: React.PropTypes.object.isRequired
		});
	}

	getChildContext() {
		return({
			socket: this.state.socket,
			serverUrl: this.state.serverUrl
		});
	}

	componentDidMount () {
			this.state.socket.on('players', (data) => {
			this.context.router.push('/' + this.props.params.quizId + '/quiz');
		});
	}

	render() {
		return(
			<div>
				{this.props.children}
			</div>
			);
	}
}

export default ContextComponent;