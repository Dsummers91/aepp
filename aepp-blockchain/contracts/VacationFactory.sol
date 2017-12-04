/**
 * @dev Deploys each Vacation contract
 */

pragma solidity ^0.4.18;

import './Vacation.sol';

contract VacationFactory {
    address[] vacations;
    address agentRegistry;

    function VacationFactory(address _agentRegistry)  public {
        agentRegistry = _agentRegistry;
    }

    function createVacation(uint256 _priceInWei, uint _registrationDeadline, uint _dateBegin, uint _dateEnd, address[] _whitelist, uint maxParticipants) returns (address vacation) {
        address _vacation = new Vacation(_priceInWei,_registrationDeadline, _dateBegin, _dateEnd,  _whitelist, maxParticipants, agentRegistry);
        vacations.push(_vacation);
        return _vacation;
    }

    function getVacationLength() public view returns (uint) {
        return vacations.length;
    }

    function getVacationByIndex(uint _index) public view returns (address) {
        return vacations[_index];
    }
}