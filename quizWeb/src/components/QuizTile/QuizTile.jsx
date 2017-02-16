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

const hittry = ['option1', 'option2', 'option3', 'option4'];
const question = 'Hi how kldsnflkds what is the question? so tell me how you are going to do it';
const playerinfo = [{ playerName: 'Dali', score: 100 }, { playerName: 'Venus', score: 99 }, { playerName: 'Karan', score: 10 },
{ playerName: 'Dali', score: 100 },{ playerName: 'Dali', score: 100 },{ playerName: 'Dali', score: 100 },{ playerName: 'Dali', score: 100 },{ playerName: 'Dali', score: 100 },{ playerName: 'Dali', score: 100 },{ playerName: 'Daligfdgfsd', score: 100 } ];

class QuizTile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			timer: 30,
			showCircularProgress: false,
			open: false
		}
	}

	handleAnswer (option) {
		this.setState({showCircularProgress: true, open: true});
	}


	componentDidMount () {
		let ab = setInterval(() => {
		let timer = {
			timer: this.state.timer - 1
		}
		this.setState(timer);
			if(this.state.timer === 0) {
				clearInterval(ab);
				this.handleNextQuestion();
			}
		}, 1000);
	}

	handleNextQuestion() {
		this.setState({showCircularProgress: false, open: false})
		console.log('Plz Next Question');
	}

	render() {
		const options = hittry.map((option, index) => {
			return (
					<Paper key={ index }
					style={style.paper}
					zDepth={1}
					onTouchTap={this.handleAnswer.bind(this, option)}
					>
						{option}
					</Paper>
				);
		});

		const players = playerinfo.map((playerinfo, index) => {
			console.log(playerinfo);
			return(
					<ListItem
					style={{fontSize: 20}}
					key={ index }
					primaryText={playerinfo.playerName}
					rightIcon={<p style={{margin: 16}}> {playerinfo.score}</p>}
					leftIcon={<p style={{margin: 16}}> { index + 1 + '.'} </p>}/>
				);
		});

		return (
			<div>
			<Dialog
			title={<div><p style={{marginLeft: '30%'}}> Moving to the Next Question.. </p>{this.state.showCircularProgress ?
					<CircularProgress
					style={{marginLeft: '44%'}}
					size={60}
					thickness={8}
					/> : null}</div> }
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
							{question}
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
						{players}
					</List>
				</Grid>
			</div>
			);
	}
}

export default QuizTile;
