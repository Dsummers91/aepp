var VacationFactory = artifacts.require("./VacationFactory.sol");
var VacationLibrary = artifacts.require("./VacationLibrary.sol");

module.exports = async (deployer) => {
  await deployer.deploy(VacationLibrary);
  let vacationLibrary = await VacationLibrary.deployed();
  deployer.deploy(VacationFactory, vacationLibrary.address);
};
