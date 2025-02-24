var artnet = require('./node_modules/artnet-node/');
var artnetsrv = require('./node_modules/artnet-node/lib/artnet_server');

var discovery = artnetsrv.ArtNetServer.discover(function (err, data) {
	console.log("err:",err,"data:",data);
}, 5000, "10.255.255.255");