// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract Borrow {
    address payable public owner;
    address payable public borrower;
    string public details; // getter: details
    uint32 public startdate;
    uint32 public enddate;
    uint32 public returndate;
    uint64 public deposit;
    uint64 public totalRent;
    string public problem;
    string public ownerReview = '';
    string public borrowerReview = '';
    uint8 public extraDays; // max 255

    enum State {
        Created,
        Accepted,
        Borrowed,
        Returned,
        Checked,
        Reviewed
    }
    State public state; // getter: state

    constructor(
        address owner_,
        string memory details_, // encoded request message + dates + borrowerId
        uint32 startdate_,
        uint32 enddate_,
        uint64 deposit_,
        uint64 totalRent_,
        address borrower_
    ) payable {
        // request to borrow -> create contract
        owner = payable(owner_);
        borrower = payable(borrower_);
        details = details_;
        startdate = startdate_;
        enddate = enddate_; 
        deposit = deposit_;
        totalRent = totalRent_;
    }

    function getState() public view returns(string memory) {
        if(state == State.Accepted) {
            return "Accepted";
        }
        if(state == State.Borrowed) {
            return "Borrowed";
        }
        if(state == State.Returned) {
            return "Returned";
        }
        if(state == State.Checked) {
            return "Checked";
        }
        if(state == State.Reviewed) {
            return "Reviewed";
        }
        return "Created";
    }

    function acceptRequest() external inState(State.Created) onlyOwner {
        require((block.timestamp <= startdate),
        "This borrow request is expired"); 
        state = State.Accepted;
    }

    function startBorrow() external payable inState(State.Accepted) onlyBorrower {
        require(
            msg.value == (deposit + totalRent),
            "Please send in the item deposit + total rent"
        ); 
        state = State.Borrowed;
        if(msg.value > 0) {
            owner.transfer(totalRent); // the owner receives the rent directy at the start
        }
    }

    function requestExtend(uint8 extraDays_) external inState(State.Borrowed) onlyBorrower {
        require((extraDays_ > 0), "Minimum value is 1.");
        extraDays = extraDays_;
    }

    function acceptExtend() external inState(State.Borrowed) onlyOwner {
        enddate = enddate + (extraDays * 86400);
    }

    function returnBorrow(uint32 returndate_) external inState(State.Borrowed) onlyBorrower {
        returndate = returndate_;
    }

    // borrower should always check CONFIRM is executed by owner before leaving!

    function confirmReturn() external inState(State.Borrowed) onlyOwner {
        state = State.Returned;
    }

    function acceptReturn() external inState(State.Returned) onlyOwner {
        state = State.Checked;
        if(deposit > 0) {
            borrower.transfer(uint256(deposit));
        }
    }

    // report a problem (e.g. broken or incomplete) -> get deposit
    function reportProblem(string memory problem_) external inState(State.Returned) onlyOwner {
        state = State.Checked;
        problem = problem_;
        if(deposit > 0) {
            owner.transfer(deposit);
        }
    }

    function reportMissing() external inState(State.Borrowed) onlyOwner {
        require(block.timestamp >= (enddate + (7 * 86400)), 
        "Report the item as missing when it is at least 7 days after the end of the borrow end date");
        state = State.Checked;
        if(deposit > 0) {        
            owner.transfer(deposit);
        }
    } 

    function writeOwnerReview(string memory review_) external inState(State.Checked) onlyOwner {
        bytes memory reviewBytes = bytes(review_);
        require((reviewBytes.length > 3), "Review is too short.");
        if(bytes(borrowerReview).length > 0) {
            state = State.Reviewed; // both parties have reviewed now
        }
        ownerReview = review_;

    } 

    function writeBorrowerReview(string memory review_) external inState(State.Checked) onlyBorrower {
        bytes memory reviewBytes = bytes(review_);
        require((reviewBytes.length > 3), "Review is too short.");
        if(bytes(ownerReview).length > 0) {
            state = State.Reviewed; // both parties have reviewed now
        }
        borrowerReview = review_;
    } 

    // modifiers

    /// The function cannot be called at the current state.
    error InvalidState();

    modifier inState(State state_) {
        if (state != state_) {
            revert InvalidState();
        }
        _;
    }

    /// Only the borrower can call this function
    error OnlyBorrower();

    modifier onlyBorrower() {
        if (msg.sender != borrower) {
            revert OnlyBorrower();
        }
        _;
    }

    /// Only the owner can call this function
    error OnlyOwner();

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

}
