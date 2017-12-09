/**
 * @dev Certifies if a person is qualified to be a travel agent
 */
 
 pragma solidity ^0.4.18;


import './tokens/Token.sol';

contract TravelAgentRegistry {
    mapping(address => bool) registered;
    address public recipient;
    uint256 constant public FEE = 1 * 10 ** 18;
    Token public token;

    function TravelAgentRegistry(address _tokenAddress) {
        token = Token(_tokenAddress);
        recipient = msg.sender;
    }

    function isRegistered(address _user) public view returns (bool) {
        return registered[_user];
    }

    function register() public returns(bool) {
        require(token.transferFrom(msg.sender, recipient, FEE));
        registered[msg.sender] = true;
        return true;
    }

    function isAgent() public view returns (bool) {
        return registered[msg.sender];
    }
}