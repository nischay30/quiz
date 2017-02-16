import React, { Component } from 'react';

class ContextComponent extends Component {

	constructor() {
		super();
		const config = require('../../config');
		// eslint-disable-next-line
		let socket = io(config.serverUrl);
		socket.on('connect', () => {
					socket.send({quizId: 123});
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

	render() {
		return(
			<div>
				{this.props.children}
			</div>
			);
	}
}

export default ContextComponent;