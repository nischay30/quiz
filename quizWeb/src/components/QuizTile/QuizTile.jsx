import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row } from 'react-flexbox-grid';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';

const style = {
	paper: {
		textAlign: 'center',
		cursor: 'pointer',
		margin: '6vh 2vh 6vh 5vh',
		padding: '2vh',
		fontSize: 20
	}
}
const quizId = 123;

class QuizTile extends Component {

	static get contextTypes() {
		return({
			router: React.PropTypes.object.isRequired,
			socket: React.PropTypes.object.isRequired
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			timer: 6,
			showCircularProgress: false,
			open: false,
			playerInfo: [],
			questions: [],
			question: '',
			options: [],
			answer: '',
			quizEnd: false
		}
	}

	componentDidMount () {
		this.context.socket.on('question', (question) => {
			let questio = question.questions.shift();
			this.setState({
				question: questio.question,
				options: questio.options,
				answer: questio.answer,
				timer: questio.timer,
				questions: question.questions 
			});
			this.runTimer();
		});

		this.context.socket.on('scores', (scores) => {
			this.setState(scores);
		});
	}

	runTimer() {
		let ab = setInterval(() => {
		let timer = {
			timer: this.state.timer - 1
		}
		this.setState(timer);
			if(this.state.timer == 0) {
				console.log('entered');
				clearInterval(ab);
				this.handleNextQuestion();
			}
		}, 1000);
	}

	handleAnswer (answeredIndex) {
		if(answeredIndex + 1 === this.state.answer) {
			this.context.socket.emit('playerAnswered', '123', 5);
		}
		else {
			this.context.socket.emit('playerAnswered', '123', 0);
		}
		this.setState({showCircularProgress: true, open: true});
	}

	handleNextQuestion() {
		console.log(this.state.questions);
		if(this.state.questions.length == 0) {
			this.setState({ quizEnd: true, showCircularProgress: false,	open: false });
		}
		else {
		let questio = this.state.questions.shift();
		this.setState({
			question: questio.question,
			options: questio.options,
			answer: questio.answer,
			timer: questio.timer,
			showCircularProgress: false,
			open: false
		});
		this.runTimer();
		}
		// this.context.socket.emit('nextQuestion', quizId);
	}

	render() {
		const options = this.state.options.map((option, index) => {
			return (
					<Paper key={ index }
					style={style.paper}
					zDepth={1}
					onTouchTap={this.handleAnswer.bind(this, index)}
					>
						{option}
					</Paper>
				);
		});

		const leaderboard = this.state.playerInfo.map((playerinfo, index) => {
			return(
					<ListItem
					style={ {fontSize: 20} }
					key={ index }
					primaryText={ playerinfo.playerName }
					rightIcon={ <p style={ {margin: 16} }> { playerinfo.score }</p> }
					leftIcon={ <p style={ {margin: 16} }> { index + 1 + '.' } </p> }/>
				);
		});

		return (
			<div>
				<Dialog
					title={<p style={{textAlign: 'center', fontSize: 50, marginTop: 0}}> Quiz Ended</p>}
					open={ this.state.quizEnd}
				>
				{leaderboard}
				</Dialog>
				<Dialog
				 title={<div> 
				 					<p style={{marginLeft: '30%'}}> Moving to the Next Question.. </p>
				 					{this.state.showCircularProgress ?
										<CircularProgress
										style={{marginLeft: '44%'}}
										size={60}
										thickness={8}
										/> : null}
								</div> }
				open={this.state.open}>
				</Dialog>
				<Grid>
					<Paper>
						<p style={{textAlign: 'center', fontSize: 50, marginTop: 0}}>
							Quiz Name
						</p>
						<p style={{position: 'fixed', right: 20, top: 0, color: 'red', fontWeight: 'bold', fontSize: 25}}>
							Time Left:- 00:00: {this.state.timer}
						</p>
					</Paper>
				</Grid>
				<Grid style={{width: '60%'}}>
					<Row>
						<Paper zDepth={1} style={{backgroundColor: '#FFFFFF', textAlign: 'center', fontSize: 35, fontWeight: 'bold', padding: '2vh', marginTop: 20, marginLeft: 10}}>
							{this.state.question}
						</Paper>
					</Row>
						<Row>
							{options}
						</Row>
				</Grid>
				<Grid style={{ position: 'fixed', right: 40, top: 80, width: '35%' }}>
					<List>
						<Subheader style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', marginTop: 20}}>
							LeaderBoard
						</Subheader>
						<Divider/>
					<ListItem
					primaryText='Trainee Name'
					style={{fontSize: 20}}
					rightIcon={<p style={{margin: 16}}> Score</p>}
					leftIcon={<p style={{margin: 16}}> No</p>}
					/>
						<Divider />
						{leaderboard}
					</List>
				</Grid>
			</div>
		);
	}
}

export default QuizTile;
