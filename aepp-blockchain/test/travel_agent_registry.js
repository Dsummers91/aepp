var TravelAgentRegistry = artifacts.require("../contracts/TravelAgentRegistry.sol");

contract('TravelAgentRegistry', function(accounts) {
  it("should assert true", function(done) {
    var travel_agent_registry = TravelAgentRegistry.deployed();
    assert.isTrue(true);
    done();
  });
});
