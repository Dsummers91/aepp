/**
 * @dev Solo trips
 */

pragma solidity ^0.4.18;

import './VacationCore.sol';

contract Loner is VacationCore {

    /*
     * @param priceInEther Price or Min. Price each person pays in equalPayment is true 
     * @dateBegin date the trip will begin
     * @dateEnd   date the trip will end
     * @whitelist users who you allow to participate, leave empty if open to the world
     */

    function Loner(uint _registrationDeadline, uint _dateBegin, uint _dateEnd, address[] _whitelist, address _agentRegistry)
    VacationCore(0, _registrationDeadline, _dateBegin, _dateEnd, _whitelist, 1, _agentRegistry)  
    {
        buyin();
    }
    
    
    function donate() payable  public {}

    function() payable public {}
}