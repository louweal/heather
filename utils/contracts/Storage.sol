// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract Storage {

    // This contracts act as a very simple public back-end for data storage => will be replaced by a regular centralized API in a later stage!

    address[] public users; // [userIds]
    mapping(address => string) public userdata; // userId => [encoded userdata]
    mapping(address => string[]) public ads; // userId => [encoded ads]
    mapping(address => string[]) public calls; // userId => [encoded calls]

    // ads
    // ad create
    function addAd(address _accountId, string memory _data) public {
        ads[_accountId].push(_data);
    }

    // ad retrieve
    function getAd(address _accountId, uint32 i) public view returns (string memory) {
        return ads[_accountId][i];
    }

    // ad update
    function updateAd(address _accountId,  uint32 i, string memory _data) public {
        ads[_accountId][i] = _data;
    }

    // ad delete
    function removeAd(address _accountId, uint32 i) public {
      delete ads[_accountId][i];
    }

    // calls

    // call create
    function addCall(address _accountId, string memory _data) public{
        calls[_accountId].push(_data);
    }

    // call retrieve
    function getCall(address _accountId, uint32 i) public view returns (string memory) {
        return calls[_accountId][i];
    }

    // call update
    function updateCall(address _accountId,  uint32 i, string memory _data) public {
        calls[_accountId][i] = _data;
    }

    // call delete
    function removeCall(address _accountId, uint32 i) public {
      delete calls[_accountId][i];
    }

    // users
    // user create

    function addUser(address _accountId, string memory _data) public {
        users.push(_accountId);
        userdata[_accountId] = _data;
    }

    // user retrievers: "users" and "userdata" 

    // user update
    function updateUser(address _accountId, string memory _data) public {
        userdata[_accountId] = _data;
    }

    // user delete
    function removeUser(address _accountId, uint32 i) public {
        delete users[i];
        delete userdata[_accountId];
    }
}
