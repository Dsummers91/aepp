pragma solidity ^0.4.18;

contract VacationWithEqualPayments {
    address public vacationLibrary;
    uint public priceInWei;
    address[] public participants;
    uint public registrationCloseDate;

    /*
     * @param equalPayment Determines if each person has to pay same amount
     * @param priceInEther Price or Min. Price each person pays in equalPayment is true 
     * @dateBegin date the trip will begin
     * @dateEnd   date the trip will end
     * @whitelist users who you allow to participate, leave empty if open to the world
     */

    function VacationWithEqualPayments(address _vacationLibrary, uint _priceInWei, uint _registrationCloseDate, uint dateBegin, uint dateEnd, address whitelist)  public {
        vacationLibrary = _vacationLibrary;
    }

    function buyin() public payable {
        require(msg.value == priceInWei);
        participants.push(msg.sender);
    }

    function donate() public payable {}
    
    function() {
        require(vacationLibrary.delegatecall(msg.data));
    }
}