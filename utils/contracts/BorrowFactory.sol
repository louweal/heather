//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Borrow.sol";

contract BorrowFactory {
    mapping(address => address) public borrowContract; // userId => last deployed borrow contract;

    function deployBorrow(address owner, string memory details, uint32 startdate, uint32 enddate, uint64 deposit, uint64 totalRent) external {
        address borrower = msg.sender;
        Borrow newBorrow = (new Borrow)(owner, details, startdate, enddate, deposit, totalRent, borrower);
        borrowContract[borrower] = address(newBorrow);
    }
}
