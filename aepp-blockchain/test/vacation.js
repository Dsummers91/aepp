var Vacation = artifacts.require("../contracts/Vacation.sol");
var TravelAgentRegistry = artifacts.require("../contracts/TravelAgentRegistry.sol");

contract('Vacation', async (accounts) => {
  let vacation;
  let registry;

  beforeEach(async () => {
    let entryFee = 1e18;
    let dateBegin = 0;
    let dateEnd = 0;
    let whitelist = [];
    registry = await TravelAgentRegistry.new();
    vacation = await Vacation.new(entryFee, dateBegin, dateEnd, whitelist, registry.address, { from: accounts[0] });
  })

  it('shoudl have entry of 1 ether', async () => {
    let entryFree = await vacation.priceInWei();
    assert.equal(+entryFree, 1e18);
  });

  it('should be able to register participants', async () => {
    await vacation.buyin({ from: accounts[0], value: 1e18 });
    let participants = await vacation.getParticipants();
    assert.equal(participants[0], accounts[0])
  });

  it('should be able to donate', async () => {
    await vacation.buyin({ from: accounts[0], value: 1e18 });
    let balance  = web3.eth.getBalance(vacation.address);
    assert.isTrue(+balance > 0);
  });

  it('should be able to remove yourself', async () => {
    await vacation.buyin({ from: accounts[0], value: 1e18 });
    await vacation.quit({ from: accounts[0] });
    let participants = await vacation.getParticipants();
    assert.equal(participants.length, 0)
  });

  it('should be able to remove yourself from multiple people', async () => {
    await vacation.buyin({ from: accounts[0], value: 1e18 });
    await vacation.buyin({ from: accounts[1], value: 1e18 });
    await vacation.buyin({ from: accounts[2], value: 1e18 });
    await vacation.buyin({ from: accounts[3], value: 1e18 });
    await vacation.quit({ from: accounts[1] });
    let participants = await vacation.getParticipants();
    assert.equal(participants.length, 3)
    assert.equal(participants[1], accounts[3]);
  }); 

  it('should not allow nonagent to submit a vacation', async() => {
    try {
      await vacation.agentSubmitVacation();
      assert.isTrue(false);
    }
    catch(e) {
      assert.isTrue(true, "error was thrown");
    }
  });

  it('should allow agent to submit vacation', async() => {
    await registry.register();
    await vacation.agentSubmitVacation("http://test.com");
    let itinerary = await vacation.itinerary();
    assert.equal(itinerary, "http://test.com")
  });
});
