var VacationFactory = artifacts.require("./VacationFactory.sol");
var Vacation = artifacts.require("./Vacation.sol");
var TravelAgentRegistry = artifacts.require("./TravelAgentRegistry.sol");

contract('VacationFactory', async (accounts) => {
  let vacationFactory;

  beforeEach(async() => {
    registry = await TravelAgentRegistry.new();
    vacationFactory = await VacationFactory.new(registry.address);
  })

  it('should be able to create a Vacation contract', async() => {
    let entryFee = 1e18;
    let deadline = Math.floor(new Date("12/15/2017") /1000);
    let dateBegin = Math.floor(new Date("12/23/2017") /1000);
    let dateEnd = Math.floor(new Date("12/28/2017") /1000);
    maxParticipants = 2;
    let whitelist = [];
    address = await vacationFactory.createVacation.call(entryFee, deadline, dateBegin, dateEnd, whitelist, maxParticipants, { from: accounts[0] });
    await vacationFactory.createVacation(entryFee, deadline, dateBegin, dateEnd, whitelist, maxParticipants, { from: accounts[0] });
    let vacation = Vacation.at(address);
    let priceInWei = await vacation.priceInWei();
    assert.equal(+priceInWei, 1e18);

    let vacationLength = await vacationFactory.getVacationLength();
    assert.equal(+vacationLength, 1);
    let vAddress = await vacationFactory.getVacationByIndex(0);
    assert.equal(vAddress, address);
  });

});
