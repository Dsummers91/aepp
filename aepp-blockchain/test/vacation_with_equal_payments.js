var VacationWithEqualPayments = artifacts.require("../contracts/VacationWithEqualPayments.sol");

contract('VacationWithEqualPayments', function(accounts) {
  let vacationWithEqualPayments;

  beforeEach(async () => {
    vacationWithEqualPayments = await VacationWithEqualPayments.new();
  })

  it("should assert true", async () => {
    assert.isTrue(true);
  });
});
