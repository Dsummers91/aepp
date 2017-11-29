var VacationNoEqualPayments = artifacts.require("../contracts/VacationNoEqualPayments.sol");
var VacationBasic = artifacts.require("../contracts/VacationBasic.sol");

contract('VacationNoEqualPayments', async (accounts) => {
  let vacationNoEqualPayments;

  beforeEach(async () => {
    let entryFee = 1e18;
    let dateBegin = 0;
    let dateEnd = 0;
    let whitelist = [];
    vacationNoEqualPayments = await VacationNoEqualPayments.new(entryFee, dateBegin, dateEnd, whitelist);
  })

  it('should be able to register participants', async () => {
    vacationNoEqualPayments.buyin({from: accounts[0], value: 1e18})
  });

  it('should be able to donate', () => {
    
  });

  it('should be able to remove yourself', () => {
    
  });
});
