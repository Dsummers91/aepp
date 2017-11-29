/**
 * @dev Vacation where each participant has to chip in equal amounts
 */

pragma solidity ^0.4.18;

import './VacationCore.sol';

contract VacationWithEqualPayments is VacationCore {

    /*
     * @param priceInEther Price or Min. Price each person pays in equalPayment is true 
     * @dateBegin date the trip will begin
     * @dateEnd   date the trip will end
     * @whitelist users who you allow to participate, leave empty if open to the world
     */

    function VacationWithEqualPayments(uint256 _priceInWei, uint dateBegin, uint dateEnd, address[] whitelist)  public {
        priceInWei = _priceInWei;
    }

    function buyin() payable public returns (bool success) {
        require(msg.value == priceInWei);
        participants.push(msg.sender);
        return true;
    }
    
    function donate() payable  public {}

    function() {
        throw;
    }
}