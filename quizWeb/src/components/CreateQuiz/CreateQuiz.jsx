import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';

import Upload from 'material-ui/svg-icons/file/file-upload';
import WriteNew  from 'material-ui/svg-icons/action/note-add';
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file';

import request from 'superagent';
import PreviewDialog from '../PreviewDialog';
const config = require('../../config');

const styles = {
	tabHead:{
		background: '#5D605C', 
		fontWeight:'bold',
		fontSize:20
	},
	headline: {
		fontSize: 24,
		paddingTop: 18,
		marginBottom: 20,
	},
	button:{
		background:'C4BBBB',
	},
	buttonLabel:{
		fontWeight:'bold',
		color:'#FFFFFF'
	},
	fileUpload:{
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		width: '100%',
		opacity: 0
	}
};

class CreateQuiz extends  Component {
		constructor(props) {
		super(props);
		this.state = {
			quizName: '',
			trainingNumber: '',
			time: '',
			files: [{name: 'Choose CSV file from your system'}],
			value: 'a',
			uploadDialogState: false,
			questions: [],
			previewDialogState: false,
			quizSavedState: false,
			titleQuizSaved: '',
			messageQuizSaved: ''
		}
	}

	handleFileChange(event) {
		this.setState({ files: event.target.files });
	}

	handleTabChange = (value) => {
		this.setState({	value: value });
	}

	handleQuizNameChange = (event) => {
		this.setState({ quizName: event.target.value });
	}

	handleTrainingNumberChange = (event) => {
		this.setState({ trainingNumber: event.target.value });
	}

	hanldeTimeChange = (event) => {
		this.setState({ time: event.target.value });
	}

	handleFormSubmit(event) {
		event.preventDefault();
		let reader = new FileReader();
	  reader.readAsText(this.state.files[0]);
	  reader.onload = (content) => {
	  	this.sendFileToServer(content.target.result);
	 	};
	  reader.onloadstart = (content) => this.setState({ uploadDialogState: true }); 
	}

	handleClose = () => {
		this.setState({previewDialogState: false});
	}

	clearState = () => {
		this.setState({
			quizName: '',
			trainingNumber: '',
			time: '',
			files: [{name: 'Choose CSV file from your system'}],
			value: 'a',
			uploadDialogState: false,
			questions: [],
			previewDialogState: false
		});
	}

	handleSave = (quizName, trainingNumber, time, questions) => {
		const tempObject={
			quizName,
			trainingNumber,
			time,
			questions
		}

		console.log(tempObject);
		request
		.post(config.serverUrl + '/saveQuiz')
		.send({tempObject})
		.end((err, res) => {
			if(err) { console.log('Err:', err); return; }
			this.setState(res.body);
			document.getElementById('submitForm').reset();
			this.clearState();
		});
	}

	handleQuizSavedClose = () => {
		this.setState({ quizSavedState: false });
	}

	sendFileToServer(data) {
		request
		.post(config.serverUrl + '/createQuiz')
		.send({data: data})
		.end((err, res) => {
			if(err) { console.log('Err:', err); return;}
			this.setState({ uploadDialogState: false, questions: res.body, previewDialogState: true });
		});
	}

	render() {
		const quizSaved = () => {
			const actions = [
				<FlatButton
					label='OK'
					primary={ true }
					onTouchTap={ this.handleQuizSavedClose }
				/>
			]
			return(
				<Dialog
				  title={ this.state.titleQuizSaved }
					open={ this.state.quizSavedState }
					actions={ actions }
				>
					<Subheader
						style={{ textAlign: 'center' }}
					>
						{ this.state.messageQuizSaved } 
					</Subheader>
				</Dialog>
			);
		}

	  const uploadDialog = () => {
	    return(
	      <Dialog
	        title={
	          <div> 
	            <p style={{marginLeft: '30%'}}>
	              UploadingFile..
	            </p>
              <CircularProgress
	              style={{marginLeft: '44%'}}
	              size={ 60 }
	              thickness={ 8 }
	            /> 
	          </div> 
	        }
	        open={ this.state.uploadDialogState } 
	      />
	    );
	  }

		return(
			<div>
				{ quizSaved() }
			  { uploadDialog() }
			  <PreviewDialog
				  open={ this.state.previewDialogState }
				  cancel={ this.handleClose }
				  save={ this.handleSave } 
				  questions={ this.state.questions }
				  quizName={ this.state.quizName }
				  trainingNumber={ this.state.trainingNumber }
				  time={ this.state.time }
			  />
				<Paper>
					<Tabs
						value={ this.state.value }
						onChange={ this.handleTabChange }
					>
						<Tab icon={<Upload />} label="Upload Questions" value="a" style={styles.tabHead}>
							<form
							  id='submitForm'
								encType='multipart/form-data'
								onSubmit={ this.handleFormSubmit.bind(this)}
							>
	 							<div style={{textAlign: 'left', marginLeft:'34%'}}>
									<label style={{margin: 10, fontWeight: 'bold', fontSize: 20}}> Enter Quiz Name </label>
										<TextField
											type='text'
											required
											value={ this.state.quizName }
											onChange={ this.handleQuizNameChange }
										  inputStyle={{color: 'red'}}
											hintText='Quiz Name'
										/>
										<br />
										<label style={{margin: 10, fontWeight: 'bold', fontSize: 20}}> Enter Training Number </label>
										<TextField
											type='text'
											required
											value={ this.state.trainingNumber }
											onChange={ this.handleTrainingNumberChange }
										  inputStyle={{color: 'red'}}
											hintText='Training Number'
										/>
										<br />
										<label style={{margin: 10, fontWeight: 'bold', fontSize: 20}}> Time Per Question </label>
										<TextField
											type='number'
											required
											value={ this.state.time }
											onChange={ this.hanldeTimeChange }
										  inputStyle={{color: 'red'}}
											hintText='Time'
											min='1'
										/>seconds
									</div>
								<div style={{marginTop:'1%', marginBottom:'3%', textAlign:'center'}}>
									<h2 style={styles.headline}>
										Upload Your Excel File
									</h2>
									<p>
										{ this.state.files[0]['name'] }
									</p>
										<RaisedButton
											icon={<FileIcon/>}
											label="Choose Excel file....."
											style={ styles.button }
											buttonStyle={{background:'#207D0A'}}
											labelStyle={ styles.buttonLabel }
											containerElement="label"
										>
											<input type="file" required accept='.csv' style={styles.fileUpload} onChange={ this.handleFileChange.bind(this) }/>
										</RaisedButton>
										<RaisedButton
											label='Uplaod File'
											primary={ true }
											type='submit'
											style={{marginLeft: 20}}
										/>
								</div>
							</form>
						</Tab>
						<Tab icon={<WriteNew/>} label="Manual Creation" value="b" style={styles.tabHead} >
							<div>
								<h2 style={styles.headline}>
									Manual Creation
								</h2>
								<p>
									Coming Soon.......
								</p>
							</div>
						</Tab>
					</Tabs>
				</Paper>
			</div>	
		);
	}
}

export default CreateQuiz;
