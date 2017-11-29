var VacationNoEqualPayments = artifacts.require("../contracts/VacationNoEqualPayments.sol");

contract('VacationNoEqualPayments', function(accounts) {
  let vacationNoEqualPayments;

  beforeEach(async () => {
    console.log('df');
    vacationNoEqualPayments = await VacationNoEqualPayments.new();
  })

  it("should assert true", async () => {
    assert.isTrue(true);
  });
});
