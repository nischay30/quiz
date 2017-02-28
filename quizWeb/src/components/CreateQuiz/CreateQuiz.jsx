import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

import Upload from 'material-ui/svg-icons/file/file-upload';
import WriteNew  from 'material-ui/svg-icons/action/note-add';
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file';

import request from 'superagent';
import PreviewDialog from '../PreviewDialog';
const config = require('../../config');

const styles = {
	tabHead:{
		backgroundColor: '#5D605C', 
		fontWeight:'bold',
		fontSize:15
	},
	headline: {
		fontSize: 24,
		paddingTop: 20,
		marginBottom: 18,
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
			files: [{name: 'Choose CSV file from your system'}],
			value: 'a',
			uploadButtonState: true,
			uploadDialogState: false,
			questions: [],
			previewDialogState: false
		}
	}

	handleFileChange(event) {
		this.setState({ files: event.target.files, uploadButtonState: false});
	}

	handleTabChange = (value) => {
		this.setState({	value: value });
	};

	handleFormSubmit(event) {
		event.preventDefault();
		let reader = new FileReader();
	  reader.readAsText(this.state.files[0]);
	  reader.onload = (content) => {
	  	this.sendDataToServer(content.target.result);
	 	};
	  reader.onloadstart = (content) => this.setState({ uploadDialogState: true }); 
	}

	handleClose = () => {
		this.setState({previewDialogState: false});
	}

	sendDataToServer(data) {
		request
		.post(config.serverUrl + '/createQuiz')
		.send({data: data})
		.end((err, res) => {
			if(err) { console.log('Err:', err); return;}
			this.setState({ uploadDialogState: false, questions: res.body, previewDialogState: true });
		});
	}

	render() {
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
			  { uploadDialog() }
			  <PreviewDialog
				  open={ this.state.previewDialogState }
				  close={ this.handleClose} 
				  questions={ this.state.questions}
			  />
				<Paper>
					<Tabs
						value={ this.state.value }
						onChange={ this.handleTabChange }
					>
						<Tab icon={<Upload />} label="Upload Questions" value="a" style={styles.tabHead}>
							<div>
								<div style={{marginTop:'2%', marginBottom:'3%', textAlign:'center'}}>
									<h2 style={styles.headline}>
										Upload Your Excel File
									</h2>
									<p>
										{ this.state.files[0]['name'] }
									</p>
									<form encType='multipart/form-data' onSubmit={ this.handleFormSubmit.bind(this)}>
										<RaisedButton
											icon={<FileIcon/>}
											label="Choose Excel file....."
											style={ styles.button }
											buttonStyle={{background:'#207D0A'}}
											labelStyle={ styles.buttonLabel }
											containerElement="label"
										>
											<input type="file"  style={styles.fileUpload} onChange={ this.handleFileChange.bind(this) }/>
										</RaisedButton>
										<RaisedButton
											label='Uplaod File'
											primary={ true }
											type='submit'
											style={{marginLeft: 20}}
											disabled={this.state.uploadButtonState}
										/>
									</form>
								</div>
							</div>
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
