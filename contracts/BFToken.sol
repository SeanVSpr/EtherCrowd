pragma solidity ^0.4.4;

import "./owned.sol";


// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract BFToken is owned {
    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;

    uint256 public totalSupply;

    event EventTransfer(bytes32 activity, uint time, address contributorAddress, address originAddress);

    /* Initializes contract with initial supply tokens to the creator of the contract */
    function BFToken() {
        //totalSupply = initialSupply;
    }

    /* Send coins */
    function transfer(address _to, uint256 _value) {
        if (balanceOf[msg.sender] < _value) throw;           // Check if the sender has enough
        if (balanceOf[_to] + _value < balanceOf[_to]) throw; // Check for overflows
        balanceOf[msg.sender] -= _value;                     // Subtract from the sender
        balanceOf[_to] += _value;                            // Add the same to the recipient
    }

    function mintToken(address target, uint256 mintedAmount) {
      balanceOf[target] += mintedAmount;
      totalSupply += mintedAmount;
      EventTransfer("Send reward token",now,target,msg.sender);
  }

  function getBalance(address addr) returns(uint) { 
    return balanceOf[addr]; 
  } 
}