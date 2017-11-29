var VacationWithEqualPayments = artifacts.require("../contracts/VacationWithEqualPayments.sol");

contract('VacationWithEqualPayments', function(accounts) {
  let vacationWithEqualPayments;

  beforeEach(async () => {
    vacationWithEqualPayments = await VacationWithEqualPayments.new();
  })

  it('should be able to register participants', async () => {
  });

  it('should be able to donate', () => {
    
  });

  it('should be able to remove yourself', () => {
    
  });


});
