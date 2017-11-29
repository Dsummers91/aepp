var VacationNoEqualPayments = artifacts.require("../contracts/VacationNoEqualPayments.sol");

contract('VacationNoEqualPayments', function(accounts) {
  let vacationNoEqualPayments;

  beforeEach(async () => {
    vacationNoEqualPayments = await VacationNoEqualPayments.new();
  })

  it('should be able to register participants', () => {
    
  });

  it('should be able to donate', () => {
    
  });

  it('should be able to remove yourself', () => {
    
  });
});
