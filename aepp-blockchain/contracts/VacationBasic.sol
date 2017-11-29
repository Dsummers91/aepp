/**
 * @dev Contains All functions that Vacations have, for the ABI
 */
pragma solidity ^0.4.18;

import './VacationCore.sol';

contract VacationBasic is VacationCore {

    function buyin() payable public {}
    function donate() payable  public {}
    function quit() public {}
    function agentSubmitVacation() (bool success) {}
}