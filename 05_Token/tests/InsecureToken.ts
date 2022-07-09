import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import {Token} from "../typechain";

describe("InsecureToken", () => {
  let insecureTokenContract: Token;
  let accounts: any[];

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const insecureTokenFactory = (await ethers.getContractFactory("Token"));
    insecureTokenContract = (await insecureTokenFactory.deploy("115792089237316195423570985008687907853269984665640564039457584007913129639935")) as Token;
    await insecureTokenContract.deployed();
  });

  describe("when the contract is deployed", () => {
    it("has provided initial supply", async () => {
        const initialSupply = await insecureTokenContract.totalSupply();
        const initialSupplyNum = initialSupply.toString();
        console.log(initialSupply);
        const accountBalance = await insecureTokenContract.balanceOf(accounts[0].address);
        let balance = accountBalance.toString();

        const accountBalance2 = await insecureTokenContract.balanceOf(accounts[1].address);
        let balance2 = accountBalance2.toString();
        console.log(`acccount balance is ${accountBalance.toString()}`);
    });    
  });

  describe("when transfer a large amout of tokens from 1 balance account", () => {
    it("The transfer go through", async () => {
        let accountBalance = await insecureTokenContract.balanceOf(accounts[1].address);
        let balance = accountBalance.toString();
        console.log(`account ${accounts[1].address} balance : ${balance}`);

        let tx = await insecureTokenContract.transfer(accounts[1].address,
          "1");
        await tx.wait(1);
        accountBalance = await insecureTokenContract.balanceOf(accounts[1].address);
        balance = accountBalance.toString();
        console.log(`account ${accounts[1].address} balance after transfer: ${balance}`);

        console.log(`transfer from account ${accounts[1].address} to ${accounts[2].address}`);

        
        accountBalance = await insecureTokenContract.balanceOf(accounts[2].address);
        balance = accountBalance.toString();
        
        tx = await insecureTokenContract
                      .connect(accounts[1])
                      .transfer(accounts[2].address,
                          "115792089237316195423570985008687907853269984665640564039457584007913129639933"
                      );
        await tx.wait(1);
        /*
        const accountBalance2 = await insecureTokenContract.balanceOf(accounts[2].address);
        let balance2 = accountBalance2.toString();
        console.log(`${accounts[2].address} balance before: ${balance}; after ${balance2}`);
        */
    });    
  });

});
