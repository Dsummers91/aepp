/**
 * @dev Includes Core Data for all Vacation Contracts
 */

pragma solidity ^0.4.18;

contract VacationCore {
    bool public finished;
    address public vacationLibrary;
    uint public priceInWei;
    address[] public participants;
    uint public registrationCloseDate;
    
}