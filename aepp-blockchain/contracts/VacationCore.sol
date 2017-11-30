/**
 * @dev Includes Core Data for all Vacation Contracts
 */

pragma solidity ^0.4.18;

import './TravelAgentRegistry.sol';

contract VacationCore {
    TravelAgentRegistry public travelAgentRegistry;
    uint256 public priceInWei;
    address[] public participants;
    uint256 public registrationCloseDate;
    mapping(address => bool) isParticipant;
    string public itinerary;

    function VacationCore(address _agentRegistry) {
        travelAgentRegistry = TravelAgentRegistry(_agentRegistry);
    }

    modifier onlyAgent(address _agent) {
        require(travelAgentRegistry.isRegistered(_agent));
        _;
    }

    function quit() {
        require(isParticipant[msg.sender] == true);
        isParticipant[msg.sender] = false;
        require(deleteParticipant(msg.sender));
    }

    function buyin() payable public returns (bool success) {
        require(!isParticipant[msg.sender]);
        isParticipant[msg.sender] = true;
        participants.push(msg.sender);
        return true;
    }

    function getParticipants() public view returns (address[]) {
        address[] memory _participants = new address[](participants.length);
        for (uint256 i = 0; i < participants.length; i++) {
            _participants[i] = participants[i];
        }
        return _participants;
    }

    function deleteParticipant(address participant) internal returns (bool success) {
        for (uint256 i = 0; i < participants.length; i++) {
            if(participants[i] == participant) {
                participants[i] = participants[participants.length - 1];
                participants.length--;
                return true;
            }
        }
        return false;
    }

    function agentSubmitVacation(string _itinerary) onlyAgent(msg.sender) {
        itinerary = _itinerary;
        msg.sender.transfer(this.balance);
    }

}