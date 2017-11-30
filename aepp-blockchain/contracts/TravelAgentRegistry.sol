/**
 * @dev Certifies if a person is qualified to be a travel agent
 */
 
 pragma solidity ^0.4.18;

contract TravelAgentRegistry {
    mapping(address => bool) registered;

    function TravelAgentRegistry() {
    }

    function isRegistered(address _user) public view returns (bool) {
        return registered[_user];
    }

    function register() public {
        registered[msg.sender] = true;
    }
}