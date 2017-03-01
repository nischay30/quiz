module.exports = (csv, callback) => {
	let rows = csv.split('\n');
	const headers = rows[0].split(',');

	let finalArray = [];
	for(let i=1; i< rows.length; i++) {
		let tempObject= {};
		let headerCount = -1;
		let stringedColumns = rows[i].split('"');
		for(let j=0; j< stringedColumns.length; j++) {
			if(j%2 === 0) {
				if(stringedColumns.length !== 0) {
					let columns = stringedColumns[j].split(",");
					for(let k=0; k< columns.length; k++) {
						if(columns[k].length !==0) {
							headerCount = headerCount + 1;
							tempObject[headers[headerCount]] = columns[k];
						}
					}
				}
			}
			else {
				headerCount = headerCount + 1;
				tempObject[headers[headerCount]] = stringedColumns[j];
			}
		}
		let options = [ tempObject.option1, tempObject.option2, tempObject.option3, tempObject.option4];
		const answer = tempObject['answer'];
		delete tempObject.option1;
		delete tempObject.option2;
		delete tempObject.option3;
		delete tempObject.option4;
		tempObject['options'] = options;
		tempObject['answer'] = answer;		
		finalArray.push(tempObject);
	}
	callback(null, finalArray);
}