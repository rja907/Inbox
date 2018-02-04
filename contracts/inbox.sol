pragma solidity ^0.4.17;

contract Inbox{
    string public message; //works like getMessage
    function Inbox(string initialMessage) public {
        //constructor function used to set initial value.
        message = initialMessage;
    }
    function setMessage(string newMessage) public {
        //sets a new value.
        message = newMessage;
    }
}
