
/**
 * @dev Central Functions for all the delegate calls
 */
 
pragma solidity ^0.4.18;

import './VacationCore.sol';

contract VacationLibrary is VacationCore {

    modifier onlyAgents {
        _;
    }

    function agentSubmitVacation() public returns (bool success) {
        finished = true;
    }

    function() {
        throw;
    }
}