/**
 * @dev Certifies if a person is qualified to be a travel agent
 */
 
 pragma solidity ^0.4.18;

contract TravelAgentRegistry {
    mapping(address => bool) isRegistered;

    function TravelAgentRegistry() {
        
    }

    function register() public {
        isRegistered[msg.sender] = true;
    }
}