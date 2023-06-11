// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract UserLookup {
    address public operator;

    mapping(address => address[]) public ads;
    mapping(address => address[]) public calls;
    mapping(address => string) public userdata; // encoded data

    constructor() {
        operator = msg.sender;
    }

    // ads
    function getAd(address _accountId, uint32 i) public view returns (address) {
        return ads[_accountId][i];
    }

    function getNumAds(address _accountId) public view returns (uint32) {
        return uint32(ads[_accountId].length);
    }

    function addAd(address _accountId, address _contractId) public onlyOperator() {
        ads[_accountId].push(payable(_contractId));
    }

    // calls

    function getCall(address _accountId, uint32 i) public view returns (address) {
        return calls[_accountId][i];
    }

    function getNumCalls(address _accountId) public view returns (uint32) {
        return uint32(calls[_accountId].length);
    }

    function addCall(address _accountId, address _contractId) public onlyOperator() {
        calls[_accountId].push(payable(_contractId));
    }

    function addUser(address _accountId, string memory _userData) public onlyOperator() {
        userdata[_accountId] = _userData;
    }

    // modifiers
    
    /// Only the operator can call this function
    error OnlyOperator();

    modifier onlyOperator() {
        if(msg.sender != operator) {
            revert OnlyOperator();
        }
        _;
    }
}
