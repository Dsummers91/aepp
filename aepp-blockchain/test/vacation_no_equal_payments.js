var VacationNoEqualPayments = artifacts.require("../contracts/VacationNoEqualPayments.sol");
var VacationBasic = artifacts.require("../contracts/VacationBasic.sol");
var VacationLibrary = artifacts.require("../contracts/VacationLibrary.sol");

contract('VacationNoEqualPayments', async (accounts) => {
  let vacationNoEqualPayments;
  let vacationLibrary = await VacationLibrary.deployed();

  beforeEach(async () => {
    vacationNoEqualPayments = await VacationNoEqualPayments.new(vacationLibrary.address);
    vacationNoEqualPayments = web3.eth.contract(VacationBasic.abi).at(vacationNoEqualPayments.address);
  })

  it('should be able to register participants', async () => {
    let finished = await vacationNoEqualPayments.finished();
    console.log(vacationLibrary.address);
    let result = await vacationNoEqualPayments.agentSubmitVacation({from: accounts[0]});
    finished = await vacationNoEqualPayments.finished();
    console.log(finished);
    assert.equal(result, true);
  });

  it('should be able to donate', () => {
    
  });

  it('should be able to remove yourself', () => {
    
  });
});
