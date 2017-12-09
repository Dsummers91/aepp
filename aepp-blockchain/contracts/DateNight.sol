/**
 * @dev When Valentines Day sneaks up on you again
 */

pragma solidity ^0.4.18;

import './VacationCore.sol';

contract DateNight is VacationCore {

    /*
     * @param priceInEther Price or Min. Price each person pays in equalPayment is true 
     * @dateBegin date the trip will begin
     * @dateEnd   date the trip will end
     * @whitelist users who you allow to participate, leave empty if open to the world
     */

    function DateNight(uint _registrationDeadline, uint _dateBegin, uint _dateEnd, address[] _whitelist, address _agentRegistry)
    VacationCore(0, _registrationDeadline, _dateBegin, _dateEnd, _whitelist, 2, _agentRegistry)  
    {}
 
    function buyin() payable public returns (bool success) {
        require(participants.length < maxParticipants);
        require(msg.value == priceInWei);
        require(super.buyin());
        return true;
    }
    
    function donate() payable  public {}

    function() payable public {}
}