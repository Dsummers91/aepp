var VacationLibrary = artifacts.require("../contracts/VacationLibrary.sol");

contract('VacationLibrary', function(accounts) {
  it("should assert true", function(done) {
    var vacation_library = VacationLibrary.deployed();
    assert.isTrue(true);
    done();
  });
});
