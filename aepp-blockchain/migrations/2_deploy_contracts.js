var VacationFactory = artifacts.require("./VacationFactory.sol");
var VacationLibrary = artifacts.require("./VacationLibrary.sol");
var TravelAgentRegistry = artifacts.require("./TravelAgentRegistry.sol");

module.exports = async (deployer) => {
  deployer.deploy(VacationLibrary);
  let vacationLibrary = await VacationLibrary.deployed();
  deployer.deploy(VacationFactory, vacationLibrary.address);
  deployer.deploy(TravelAgentRegistry);
};
