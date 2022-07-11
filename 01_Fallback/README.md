# 15. Naught Coin Challenge
* Analysis

  After review the contract, going to try the following:
  * Make a note of the contract address.
  * call the contribute function so contributions[msg.sender] > 0.
  * call the send method to send tiny amout of ether (this will invoke the receive method and becoming the owner)
  * call the withdraw method.