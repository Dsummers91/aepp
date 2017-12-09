var TravelAgentRegistry = artifacts.require("../contracts/TravelAgentRegistry.sol");
var Token = artifacts.require("../contracts/tokens/TestToken.sol");

contract('TravelAgentRegistry', function(accounts) {
  it('should be able to register as a travel agent', async () => {
    let travelAgentRegistry = await TravelAgentRegistry.deployed();
    let token = await Token.deployed();
    await token.approve(travelAgentRegistry.address, 1e18, {from: accounts[0]});
    let isRegistered = await travelAgentRegistry.isRegistered(accounts[0]);
    assert.equal(isRegistered, false);

    await travelAgentRegistry.register();

    isRegistered = await travelAgentRegistry.isRegistered(accounts[0]);
    assert.equal(isRegistered, true);
  });
});
