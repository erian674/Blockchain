// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VotingSystem {
    
    struct Voter {
        uint weight;
        bool voted;
        uint vote;
    }

    struct Proposal {
        string name;
        uint voteCount;
    }

    address public chairperson;
    mapping(address => Voter) public voters;
    Proposal[] public proposals;

    // --- NEW: Thêm biến deadline ---
    uint public votingDeadline; 

    // Sửa Constructor để nhận thêm thời gian Deadline
    constructor(string[] memory proposalNames, uint _durationInSeconds) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        // --- NEW: Set deadline là thời gian hiện tại + khoảng thời gian input ---
        votingDeadline = block.timestamp + _durationInSeconds;

        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function giveRightToVote(address voter, uint weight) public {
        require(msg.sender == chairperson, "Only chairperson can give right to vote.");
        require(!voters[voter].voted, "The voter already voted.");
        require(voters[voter].weight == 0, "Voter already has voting rights.");
        voters[voter].weight = weight;
    }

    function vote(uint proposalIndex) public {
        Voter storage sender = voters[msg.sender];

        require(sender.weight > 0, "No right to vote");
        require(!sender.voted, "Already voted");
        
        // --- NEW: Check xem đã hết hạn chưa ---
        require(block.timestamp <= votingDeadline, "Voting is closed (Deadline passed)");

        sender.voted = true;
        sender.vote = proposalIndex;
        proposals[proposalIndex].voteCount += sender.weight;
    }
    
    // Hàm mới để xem còn bao lâu nữa hết hạn
    function getTimeLeft() public view returns (uint) {
        if (block.timestamp >= votingDeadline) {
            return 0;
        }
        return votingDeadline - block.timestamp;
    }
}