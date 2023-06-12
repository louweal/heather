//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DummyAd {
    address payable public owner;
    string public metadata;
    uint32 public deposit;
    uint32 public rent;
    uint32 public date; // date listed

    constructor(
        string memory metadata_,
        uint32 deposit_, uint32 rent_, address dummyOwner_, uint32 date_
    ) payable {
        owner = payable(dummyOwner_);
        metadata = metadata_;
        date = date_;
        deposit = deposit_;
        rent = rent_;
    }
}