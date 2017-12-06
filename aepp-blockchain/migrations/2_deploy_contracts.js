var VacationFactory = artifacts.require("./VacationFactory.sol");
var TravelAgentRegistry = artifacts.require("./TravelAgentRegistry.sol");
var fs = require('fs');
var path = require('path');

module.exports = async (deployer) => {
  await deployer.deploy(TravelAgentRegistry);
  let reg = await TravelAgentRegistry.deployed();
  await deployer.deploy(VacationFactory, reg.address);
  let factory = await VacationFactory.deployed();

  //SOME REASON ARTIFACT DOESNT UPDATE SO DOINT IT MANUALLY
  web3.version.getNetwork((err, netId) => {
    fs.readFile(path.resolve(__dirname, '../build/contracts/VacationFactory.json'), (err, res) => {
      let artifact = JSON.parse(res.toString());
      artifact.networks[netId] = artifact.networks[netId] || {
        "events": {},
        "links": {},
      }
      artifact.networks[netId].address = factory.address;
      fs.writeFile(path.resolve(__dirname, '../build/contracts/VacationFactory.json'), JSON.stringify(artifact), (err, res) => {
        console.log(err, res);
      });
    })
  });
};

