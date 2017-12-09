/**
 * @dev Deploys each Vacation contract
 */

pragma solidity ^0.4.18;

import './Vacation.sol';
import './DateNight.sol';
import './Loner.sol';

contract VacationFactory {
    address[] vacations;
    address[] dateNights;
    address[] loners;
    address public agentRegistry;

    function VacationFactory(address _agentRegistry)  public {
        agentRegistry = _agentRegistry;
    }

    function createVacation(uint256 _priceInWei, uint _registrationDeadline, uint _dateBegin, uint _dateEnd, address[] _whitelist, uint maxParticipants) returns (address vacation) {
        address _vacation = new Vacation(_priceInWei,_registrationDeadline, _dateBegin, _dateEnd,  _whitelist, maxParticipants, agentRegistry);
        vacations.push(_vacation);
        return _vacation;
    }

    function createDatenight(uint256 _priceInWei, uint _registrationDeadline, uint _dateBegin, uint _dateEnd, address[] _whitelist, uint maxParticipants) returns (address dateNight) {
        address _dateNight = new DateNight(_registrationDeadline, _dateBegin, _dateEnd, _whitelist, agentRegistry);
        dateNights.push(_dateNight);
        return _dateNight;
    }

    function createLoner(uint256 _priceInWei, uint _registrationDeadline, uint _dateBegin, uint _dateEnd, address[] _whitelist, uint maxParticipants) returns (address dateNight) {
        address _loner = new Loner(_registrationDeadline, _dateBegin, _dateEnd, _whitelist, agentRegistry);
        loners.push(_loner);
        return _loner;
    }

    function getVacationLength() public view returns (uint) {
        return vacations.length;
    }

    function getVacationByIndex(uint _index) public view returns (address) {
        return vacations[_index];
    }

    function getLonerLength() public view returns (uint) {
        return loners.length;
    }

    function getLonerByIndex(uint _index) public view returns (address) {
        return loners[_index];
    }

    function getDateNightLength() public view returns (uint) {
        return dateNights.length;
    }

    function getDateNightByIndex(uint _index) public view returns (address) {
        return dateNights[_index];
    }
}