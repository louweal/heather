//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Ad {
    address payable public owner;
    string public metadata;
    uint32 public deposit;
    uint32 public rent;
    uint32 public date; // date listed

    constructor(
        string memory metadata_,
        uint32 deposit_, uint32 rent_
    ) payable {
        owner = payable(msg.sender);
        metadata = metadata_;
        date = uint32(block.timestamp);
        deposit = deposit_;
        rent = rent_;
    }
}