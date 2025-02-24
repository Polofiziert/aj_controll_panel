var artnet = require("../node_modules/artnet-node");
var artnetClient = artnet.Client;
const fs = require("node:fs");

function sendArtNet(data) {
	// Send 1 packet to each node found, at universe 0
	var client = new artnetClient("192.168.2.137", 6454, 0);
	client.send(data, function (err) {
		if (!err) {
			console.log("Packet sent to " + this._host);
		} else {
			console.log("Error: ", err);
		}
		// Close socket when done
		this.close();
	});
}

fs.readFile("./dmxOUT.json", "utf8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	dmxData = JSON.parse(data);
	console.log(dmxData);

	let i = 0;
	let loop = 1;
	sendDmxIntervall = setInterval(function () {
		i += 1;
		if (i === dmxData.length && loop == false) {
			clearInterval(sendDmxIntervall);
		} else if (i === dmxData.length && loop == true) {
			i = 1;
		}

		sendArtNet(dmxData[i-1]); // i-1 um nulltes element mit zu nehmen
	}, 50);
});
