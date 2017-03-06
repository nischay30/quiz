const convertCsvToJson = require('./convertCsvToJson');

module.exports = (req, res) => {
	convertCsvToJson(req.body.data, (err, jsonArray) => {
		if(err) { console.log("Err:", err); return; }
		res.json(jsonArray);
	});
}