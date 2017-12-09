var VacationFactory = artifacts.require("./VacationFactory.sol");
var TravelAgentRegistry = artifacts.require("./TravelAgentRegistry.sol");
var TestToken = artifacts.require("./tokens/TestToken.sol");
var fs = require('fs');
var path = require('path');

module.exports = function (deployer) {
  deployer.deploy(TestToken, "TST", "TST", 18)
    .then(function() {
      return deployer.deploy(TravelAgentRegistry, TestToken.address);
    })
    .then(function() {
      return deployer.deploy(VacationFactory, TravelAgentRegistry.address);
    })
};

