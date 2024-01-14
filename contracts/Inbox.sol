// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
// linter warnings (red underline) about pragma version can igonored!

contract Inbox {
    string public message;
    constructor(string memory initialMessage)  {
    message = initialMessage;
    }

    
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}I