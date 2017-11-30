/**
 * @dev Vacation where each participant has to chip in equal amounts
 */

pragma solidity ^0.4.18;

import './VacationCore.sol';

contract Vacation is VacationCore {

    /*
     * @param priceInEther Price or Min. Price each person pays in equalPayment is true 
     * @dateBegin date the trip will begin
     * @dateEnd   date the trip will end
     * @whitelist users who you allow to participate, leave empty if open to the world
     */

    function Vacation(uint256 _priceInWei, uint dateBegin, uint dateEnd, address[] whitelist, address _agentRegistry)
    VacationCore(_agentRegistry)  
    {
        priceInWei = _priceInWei;
    }
 

    function buyin() payable public returns (bool success) {
        require(msg.value == priceInWei);
        require(super.buyin());
        return true;
    }
    
    function donate() payable  public {}

    function() {
        throw;
    }
}