pragma solidity ^0.4.18;

contract TravelCoordinatorRegistry {
    mapping(address => bool) isRegistered;

    function TravelCoordinatorRegistry() {
        
    }

    function register() public {
        isRegistered[msg.sender] = true;
    }
}