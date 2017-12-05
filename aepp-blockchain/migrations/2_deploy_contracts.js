var VacationFactory = artifacts.require("./VacationFactory.sol");
var TravelAgentRegistry = artifacts.require("./TravelAgentRegistry.sol");

module.exports = async (deployer) => {
  await deployer.deploy(TravelAgentRegistry);
  let reg = await TravelAgentRegistry.deployed();
  deployer.deploy(VacationFactory, reg.address);
};
