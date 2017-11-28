pragma solidity ^0.4.18;

contract VacationNoEqualPayments {
    address public vacationLibrary;
    uint public priceInWei;
    address[] public participants;

    /*
     * @param equalPayment Determines if each person has to pay same amount
     * @param priceInEther Price or Min. Price each person pays in equalPayment is true 
     * @dateBegin date the trip will begin
     * @dateEnd   date the trip will end
     * @whitelist users who you allow to participate, leave empty if open to the world
     */

    function VacationNoEqualPayments(address _vacationLibrary, uint _priceInWei, uint dateBegin, uint dateEnd, address whitelist)  public {
        vacationLibrary = _vacationLibrary;
    }

    function buyin() payable public {
        require(msg.value >= priceInWei);
        participants.push(msg.sender);
    }
    
    function donate() payable  public {}

    function() {
        require(vacationLibrary.delegatecall(msg.data));
    }
}