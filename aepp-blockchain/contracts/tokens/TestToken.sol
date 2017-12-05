pragma solidity ^0.4.18;

import './StandardToken.sol';

contract TestToken is StandardToken {
  string public name = "Test";
  string public symbol = "TST";
  uint public decimals = 18;

  function TestToken(string _name, string _symbol, uint _decimals) {
    totalSupply = 5000 ether;
    balances[msg.sender] = 5000 ether;
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
  }
}