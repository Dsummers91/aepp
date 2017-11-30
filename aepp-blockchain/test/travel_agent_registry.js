var TravelAgentRegistry = artifacts.require("../contracts/TravelAgentRegistry.sol");

contract('TravelAgentRegistry', function(accounts) {
  it('should be able to register as a travel agent', async () => {
    let travelAgentRegistry = await TravelAgentRegistry.deployed();
    let isRegistered = await travelAgentRegistry.isRegistered(accounts[0]);
    assert.equal(isRegistered, false);

    await travelAgentRegistry.register();

    isRegistered = await travelAgentRegistry.isRegistered(accounts[0]);
    assert.equal(isRegistered, true);
  });
});
