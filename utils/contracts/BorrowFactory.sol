//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Borrow.sol";

contract BorrowFactory {
    function deployBorrow(address owner, string memory details, uint32 startdate, uint32 enddate, uint32 deposit, uint32 totalRent) external returns (address) {
        Borrow newBorrow = (new Borrow)(owner, details, startdate, enddate, deposit, totalRent);
        return (address(newBorrow));
    }
}
