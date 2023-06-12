// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract UserLookup {
    address public operator;

    uint32 public numUsers;
    mapping(address => address[]) public ads;
    mapping(address => address[]) public calls;
    mapping(address => string) public userdata; // encoded data
    address[] public users;

    constructor() {
        operator = msg.sender;
    }

    // function getUserId(uint256 i) public view returns (address) {
    //     return users[i];
    // }

    // function getNumUsers() public view returns (uint32) {
    //     return numUsers;
    // }

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
        users.push(_accountId);
        userdata[_accountId] = _userData;
        emit NewUser(numUsers++);
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

        // events
    event NewUser(uint256 indexed numUsers);
}
