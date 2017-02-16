const client = require('./services/getRedisClient').duplicate();
const queuePlayer = require('./services/queuePlayer');

function initializeProvisioner() {
	processMessage();
}

function processMessage() {
	client.brpop('queuedPlayers', 0, (err, playerInfo) => {
		console.log('Player added');
		if(err) {console.log(err); }
		queuePlayer(JSON.parse(playerInfo[1]));
		setTimeout(initializeProvisioner);
	});
}

initializeProvisioner();
