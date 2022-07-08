# 5. Token Challenge
* Overflow and underflow
  * If a balance reaches the maximum uint value (2^256) it will circle back to zero. 
  * The same is true for underflow. If a uint is made to be less than zero, it will cause an underflow and get set to its maximum value.


* Analysis

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.4;

  contract Token {

    mapping(address => uint) internal balances;
    uint public totalSupply;

    constructor(uint _initialSupply) {
      balances[msg.sender] = totalSupply = _initialSupply;
    }

    function transfer(address _to, uint _value) public returns (bool) {
      require(balances[msg.sender] - _value >= 0);
      balances[msg.sender] -= _value;
      balances[_to] += _value;
      return true;
    }

    function balanceOf(address _owner) public view returns (uint balance) {
      return balances[_owner];
    }
  }
  ```

  ```
  require(balances[msg.sender] - _value >= 0)
  ```

  In above stamemen, though the balance of msg.sender is way less than _value, the condition is still met because of underflow.

  It also can potentially wipe out the tokens of transferTo account because of overflow.
  ```
  balances[_to] += _value;
  ```

