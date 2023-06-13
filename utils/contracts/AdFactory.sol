//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Ad.sol";
import "./DummyAd.sol";

contract AdFactory {
    function deployAd(string memory metadata_,
        uint32 deposit_, uint32 rentStart_, uint32 rentExtra_) external returns (address) {
        Ad newAd = (new Ad)(metadata_, deposit_, rentStart_, rentExtra_);
        return (address(newAd));
    }

    function deployDummyAd(string memory metadata_,
        uint32 deposit_, uint32 rentStart_, uint32 rentExtra_, address dummyOwner_) external returns (address) {
        DummyAd newAd = (new DummyAd)(metadata_, deposit_, rentStart_, rentExtra_, dummyOwner_);
        return (address(newAd));
    }
}
