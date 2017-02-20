import React, { Component } from 'react';

class WaitingPlayers extends Component {
	static get contextTypes() {
		return({
			router: React.PropTypes.object.isRequired,
			socket: React.PropTypes.object.isRequired
		});
	}

	render() {
		return(
			<div>
				<small>Waiting for the players</small>
			</div>
			);
	}
}

export default WaitingPlayers;
