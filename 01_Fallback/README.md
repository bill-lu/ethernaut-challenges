# 15. Naught Coin Challenge
* Analysis

  After review the contract, going to try the following:
  * Make a note of the contract address.
  * call the contribute function so contributions[msg.sender] > 0.
  * Uses MetaMask to send 0.01 ether to the contract (this will invoke the receive method and becoming the owner)
  * call the withdraw method.