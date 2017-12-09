var TestToken = artifacts.require("./tokens/TestToken.sol");
var fs = require('fs');
var path = require('path');

module.exports = function (deployer) {
    fs.readFile(path.resolve(__dirname, '../build/contracts/TestToken.json'), (err, res) => {
        let artifact = JSON.parse(res.toString());
        artifact.networks[42] = artifact.networks[42] || {
            "events": {},
            "links": {},
            "address": "0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9"
        }
        fs.writeFile(path.resolve(__dirname, '../build/contracts/TestToken.json'), JSON.stringify(artifact), (err, res) => {
            console.log(err, res);
        });
    })
}