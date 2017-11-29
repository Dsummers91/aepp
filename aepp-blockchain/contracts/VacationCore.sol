/**
 * @dev Includes Core Data for all Vacation Contracts
 */

pragma solidity ^0.4.18;

contract VacationCore {
    address public vacationLibrary;
    uint256 public priceInWei;
    address[] public participants;
    uint256 public registrationCloseDate;
    mapping(address => bool) isParticipant;

    function quit() {
        require(isParticipant[msg.sender] == true);
        isParticipant[msg.sender] = false;
    }

    function getParticipants() public view returns (address[]) {
        address[] memory _participants = new address[](participants.length);
        for (uint256 i = 0; i < participants.length; i++) {
            _participants[i] = participants[i];
        }
        return _participants;
    }
}