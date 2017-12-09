var Vacation = artifacts.require("../contracts/Loner.sol");
var TravelAgentRegistry = artifacts.require("../contracts/TravelAgentRegistry.sol");
var TestToken = artifacts.require("../contracts/TestToken.sol");

contract('Loner', async (accounts) => {
  let vacation;
  let registry;
  let token;
  
  beforeEach(async () => {
    let entryFee = 0;
    let deadline = Math.floor(new Date("12/15/2017") /1000);
    let dateBegin = Math.floor(new Date("12/23/2017") /1000);
    let dateEnd = Math.floor(new Date("12/28/2017") /1000);
    maxParticipants = 2;
    let whitelist = [];
    token = await TestToken.deployed()
    registry = await TravelAgentRegistry.new(token.address);
    vacation = await Vacation.new(deadline, dateBegin, dateEnd, whitelist, registry.address, { from: accounts[0] });
  })

  it('should have begin date of December 23rd', async() => {
    let duration = await vacation.getDuration();
    let dateBegin = Math.floor(new Date("12/23/2017") /1000);
    let dateEnd = Math.floor(new Date("12/28/2017") /1000);
    assert.equal(duration[0], dateBegin);
    assert.equal(duration[1], dateEnd);
  });
  
  it('shoudl not have entry fee', async () => {
    let entryFree = await vacation.priceInWei();
    assert.equal(+entryFree, 0);
  });


  it('should  not be able to register more participants', async () => {
    try {
      await vacation.buyin({ from: accounts[4], value: 0 });
      assert.isTrue(false);
    } catch(e) {
      assert.isTrue(true);
    }
    let participants = await vacation.getParticipants();
    assert.equal(participants[0], accounts[0])
  });

  it('should be able to donate', async () => {
    await vacation.donate({ from: accounts[0], value: 1e18 });
    let balance  = web3.eth.getBalance(vacation.address);
    assert.isTrue(+balance > 0);
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
    await vacation.buyin({ from: accounts[1], value: 0 });
    await token.approve(registry.address, 1e18);
    await registry.register();
    let balance = await web3.eth.getBalance(vacation.address);
    await vacation.agentSubmitVacation("http://test.com");
    let itinerary = await vacation.itinerary();
    assert.equal(itinerary, "http://test.com");
    balance = await web3.eth.getBalance(vacation.address);
    assert.equal(+balance, 0);
  });
});
