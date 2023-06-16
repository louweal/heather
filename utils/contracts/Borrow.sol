// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract Borrow {
    address payable public owner;
    address payable public borrower;
    string public details; // getter: details
    uint32 public startdate;
    uint32 public enddate;
    uint32 public returndate;
    uint32 public deposit;
    uint32 public totalRent;
    string public problem;
    string public ownerReview;
    string public borrowerReview;
    uint8 public extraDays; // max 255

    enum State {
        Created,
        Accepted,
        Borrowed,
        Returned,
        Ended
    }
    State public state; // getter: state
    uint32 stateI; // the state in uint formal

    event SetState(uint stateI);

    constructor(
        address owner_,
        string memory details_, // encoded request message + dates + borrowerId
        uint32 startdate_,
        uint32 enddate_,
        uint32 deposit_,
        uint32 totalRent_
    ) payable {
        // request to borrow -> create contract
        owner = payable(owner_);
        borrower = payable(msg.sender);
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
        if(state == State.Ended) {
            return "Ended";
        }
        return "Created";
    }

    function acceptRequest() external inState(State.Created) onlyOwner {
        require((block.timestamp <= startdate),
        "This borrow request is expired"); 
        state = State.Borrowed; //State.Accepted;
        emit SetState(uint32(state));
    }

    function startBorrow() external payable inState(State.Accepted) onlyBorrower {
        // require(
        //     msg.value == (deposit + totalRent),
        //     "Please send in the item deposit + total rent"
        // ); 
        state = State.Borrowed;
        // emit SetState(uint32(state));
        // if(msg.value > 0) {
        //     owner.transfer(totalRent); // the owner receives the rent directy at the start
        // }
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
        emit SetState(uint32(state)); 
    }

    function acceptReturn() external inState(State.Returned) onlyOwner {
        state = State.Ended;
        // emit SetState(uint32(state)); 
        if(deposit > 0) {
            borrower.transfer(uint256(deposit));
        }
    }

    // report a problem (e.g. broken or incomplete) -> get deposit
    function reportProblem(string memory problem_) external inState(State.Returned) onlyOwner {
        state = State.Ended;
        emit SetState(uint32(state)); 
        problem = problem_;
        owner.transfer(deposit);
    }

    function reportMissing() external inState(State.Borrowed) onlyOwner {
        require(block.timestamp > (enddate + (7 * 86400)), 
        "Report the item as missing when it is at least 7 days after the end of the borrow end date");
        state = State.Ended;
        emit SetState(uint32(state)); 
        owner.transfer(deposit);
    } 

    function writeOwnerReview(string memory review_) external inState(State.Ended) onlyOwner {
        ownerReview = review_;
    } 

    function writeBorrowerReview(string memory review_) external inState(State.Ended) onlyBorrower {
        borrowerReview = review_;
    } 

    // optional: return the deposit (partially) to the borrower after a misunderstanding is resolved
    function settleDeposit() external payable inState(State.Ended) onlyOwner {
        require((msg.value <= deposit), "You can't send more than the initial deposit");
        borrower.transfer(msg.value);
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
