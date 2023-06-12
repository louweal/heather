//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Ad.sol";
import "./DummyAd.sol";

contract AdFactory {

    function deployAd(string memory metadata_,
        uint32 deposit_, uint32 rent_) external returns (address) {
        Ad newAd = (new Ad)(metadata_, deposit_, rent_);
        return (address(newAd));
    }

    function deployDummyAd(string memory metadata_,
        uint32 deposit_, uint32 rent_, address dummyOwner_, uint32 date_) external returns (address) {
        DummyAd newAd = (new DummyAd)(metadata_, deposit_, rent_, dummyOwner_, date_);
        return (address(newAd));
    }
}