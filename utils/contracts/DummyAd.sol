//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DummyAd {
    address payable public owner;
    string public metadata;
    uint32 public deposit;
    uint32 public rentStart;
    uint32 public rentExtra;
    uint32 public date; // date listed

    constructor(
        string memory metadata_,
        uint32 deposit_, uint32 rentStart_, uint32 rentExtra_, address dummyOwner_
    ) payable {
        owner = payable(dummyOwner_);
        metadata = metadata_;
        deposit = deposit_;
        rentStart = rentStart_;
        rentExtra = rentExtra_;    
    }
}