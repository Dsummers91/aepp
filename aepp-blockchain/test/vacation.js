var Vacation = artifacts.require("../contracts/Vacation.sol");
var TravelAgentRegistry = artifacts.require("../contracts/TravelAgentRegistry.sol");
var TestToken = artifacts.require("../contracts/TestToken.sol");

contract('Vacation', async (accounts) => {
  let vacation;
  let registry;
  let token;
  
  beforeEach(async () => {
    let entryFee = 1e18;
    let deadline = Math.floor(new Date("12/15/2017") /1000);
    let dateBegin = Math.floor(new Date("12/23/2017") /1000);
    let dateEnd = Math.floor(new Date("12/28/2017") /1000);
    maxParticipants = 4;
    let whitelist = [];
    token = await TestToken.deployed()
    registry = await TravelAgentRegistry.new(token.address);
    vacation = await Vacation.new(entryFee, deadline, dateBegin, dateEnd, whitelist, maxParticipants, registry.address, { from: accounts[0] });
  })

  it('should have begin date of December 23rd', async() => {
    let duration = await vacation.getDuration();
    let dateBegin = Math.floor(new Date("12/23/2017") /1000);
    let dateEnd = Math.floor(new Date("12/28/2017") /1000);
    assert.equal(duration[0], dateBegin);
    assert.equal(duration[1], dateEnd);
  });
  
  it('shoudl have entry of 1 ether', async () => {
    let entryFree = await vacation.priceInWei();
    assert.equal(+entryFree, 1e18);
  });

  it('should be able to register participants', async () => {
    await vacation.buyin({ from: accounts[0], value: 1e18 });
    let participants = await vacation.getParticipants();
    assert.equal(participants[0], accounts[0])
  });

  it('should  not be able to register more participants than max ', async () => {
    await vacation.buyin({ from: accounts[0], value: 1e18 });
    await vacation.buyin({ from: accounts[1], value: 1e18 });
    await vacation.buyin({ from: accounts[2], value: 1e18 });
    await vacation.buyin({ from: accounts[3], value: 1e18 });
    try {
      await vacation.buyin({ from: accounts[4], value: 1e18 });
      assert.isTrue(false);
    } catch(e) {
      assert.isTrue(true);
    }
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
    await vacation.buyin({ from: accounts[0], value: 1e18 });
    await vacation.buyin({ from: accounts[1], value: 1e18 });
    await vacation.buyin({ from: accounts[2], value: 1e18 });
    await vacation.buyin({ from: accounts[3], value: 1e18 });
    await token.approve(registry.address, 1e18);
    await registry.register();
    let balance = await web3.eth.getBalance(vacation.address);
    assert.equal(+balance, 4e18);
    await vacation.agentSubmitVacation("http://test.com");
    let itinerary = await vacation.itinerary();
    assert.equal(itinerary, "http://test.com");
    balance = await web3.eth.getBalance(vacation.address);
    assert.equal(+balance, 0);
  });
});
