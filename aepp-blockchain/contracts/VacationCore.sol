/**
 * @dev Includes Core Data for all Vacation Contracts
 */

pragma solidity ^0.4.18;

import './TravelAgentRegistry.sol';

contract VacationCore {
    TravelAgentRegistry public travelAgentRegistry;
    uint256 public priceInWei;
    address[] public participants;
    uint256 public registrationDeadline;
    uint256[2] public duration;
    uint public maxParticipants;
    mapping(address => bool) isParticipant;
    string public itinerary;
    bool public scheduled;


    function VacationCore(
        uint256 _priceInWei, 
        uint256 _registrationDeadline, 
        uint256 _dateBegin, 
        uint256 _dateEnd, 
        address[] _whitelist, 
        uint _maxParticipants,
        address _agentRegistry
    ) {
        travelAgentRegistry = TravelAgentRegistry(_agentRegistry);
        priceInWei = _priceInWei;
        maxParticipants = _maxParticipants;
        registrationDeadline = _registrationDeadline;
        duration = [_dateBegin, _dateEnd];
    }

    modifier onlyAgent {
        require(travelAgentRegistry.isRegistered(msg.sender));
        _;
    }

    modifier isScheduled {
        require(scheduled);
        _;
    }

    modifier isNotScheduled {
        require(!scheduled);
        _;
    }

    modifier readyForScheduling {
        require(!scheduled);
        require(maxParticipants == participants.length || now >= registrationDeadline);
        _;
    }
    
    function quit() {
        require(isParticipant[msg.sender] == true);
        isParticipant[msg.sender] = false;
        require(deleteParticipant(msg.sender));
    }

    function buyin() payable public isNotScheduled returns (bool success) {
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

    function getDuration() public view returns (uint256[]) {
        uint256[] memory _duration = new uint256[](2);
        _duration[0] = duration[0];
        _duration[1] = duration[1];
        return _duration;
    }
    
    function agentSubmitVacation(string _itinerary) readyForScheduling onlyAgent {
        itinerary = _itinerary;
        msg.sender.transfer(this.balance);
        scheduled = true;
    }

}