var VacationWithEqualPayments = artifacts.require("../contracts/VacationWithEqualPayments.sol");

contract('VacationWithEqualPayments', async (accounts) => {
  let vacationWithEqualPayments;

  beforeEach(async () => {
    let entryFee = 1e18;
    let dateBegin = 0;
    let dateEnd = 0;
    let whitelist = [];
    vacationWithEqualPayments = await VacationWithEqualPayments.new(entryFee, dateBegin, dateEnd, whitelist, { from: accounts[0] });
  })

  it('shoudl have entry of 1 ether', async () => {
    let entryFree = await vacationWithEqualPayments.priceInWei();
    assert.equal(+entryFree, 1e18);
  });

  it('should be able to register participants', async () => {
    await vacationWithEqualPayments.buyin({ from: accounts[0], value: 1e18 });
    let participants = await vacationWithEqualPayments.getParticipants();
    console.log(participants);
  });

  it('should be able to donate', () => {

  });

  it('should be able to remove yourself', () => {

  });


});
