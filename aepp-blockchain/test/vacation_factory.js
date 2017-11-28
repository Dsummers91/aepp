var VacationFactory = artifacts.require("./VacationFactory.sol");
var VacationLibrary = artifacts.require("./VacationLibrary.sol");

contract('VacationFactory', async (accounts) => {
  it("should have VacationLibrary as Library", async () => {
    let vacation_library = await VacationLibrary.new();
    let vacation_factory = await VacationFactory.new(vacation_library.address);

    let factoryLibraryAddress = await vacation_factory.vacationLibrary();
    assert.equal(factoryLibraryAddress, vacation_library.address);
  });
});
