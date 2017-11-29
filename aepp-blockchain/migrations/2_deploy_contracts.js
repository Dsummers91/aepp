var VacationFactory = artifacts.require("./VacationFactory.sol");
var TravelAgentRegistry = artifacts.require("./TravelAgentRegistry.sol");

module.exports = async (deployer) => {
  deployer.deploy(TravelAgentRegistry);
  deployer.deploy(VacationFactory);
};
