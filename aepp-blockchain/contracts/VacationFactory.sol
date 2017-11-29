/**
 * @dev Deploys each Vacation contract
 */

pragma solidity ^0.4.18;

import './VacationWithEqualPayments.sol';
import './VacationNoEqualPayments.sol';

contract VacationFactory {
    address public vacationLibrary;

    function VacationFactory(address _vacationLibrary)  public {
        vacationLibrary = _vacationLibrary;
    }
}