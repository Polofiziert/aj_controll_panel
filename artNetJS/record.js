var artnet = require('./node_modules/artnet-node/');
var artnetsrv = require('./node_modules/artnet-node/lib/artnet_server');
const fs = require('node:fs');

var dmxRecord = [];

var srv = artnetsrv.ArtNetServer.listen(6454, function(err, msg, peer) {
    console.log("##########################################");
    console.log(new Date())
    console.log("-- Msg: ");
    console.log(msg);
    console.log("-- Msg --");

    console.log("-- Err: ");
    console.log(err);
    console.log("-- Err --");

    console.log("-- Peer: ");
    console.log(peer);
    console.log("-- Peer --");

    dmxRecord.push(msg.data);

});

setTimeout(function(){

    var content = JSON.stringify(dmxRecord);
    fs.appendFile('./dmxOUT.json', content + "\r\n", err => {
        if (err) {
        console.error(err);
        } else {
        console.error("File Written!");
        }
    });

}, 10000);