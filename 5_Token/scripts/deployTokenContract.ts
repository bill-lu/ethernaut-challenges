import { ethers, Signer } from "ethers";
import "dotenv/config";
import * as tokenJson from "../artifacts/contracts/Token.sol/Token.json";
import {Token} from "../typechain";

const intialSupply = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

async function  deployTokenContract( 
  signerWallet: ethers.Wallet) 
{
  const provider = ethers.providers.getDefaultProvider("rinkeby");
  const signer = signerWallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  
  console.log(" ======Deploying Token contract======");
  
  const tokenFactory = new ethers.ContractFactory(
    tokenJson.abi,
    tokenJson.bytecode, 
    signer
  );

  const tokenContract = (await tokenFactory.deploy(
    intialSupply)) as Token;
  
  console.log(" Awaiting confirmations");
  await tokenContract.deployed();

  console.log(" Completed");
  console.log(` Token Contract deployed at ${tokenContract.address}`);

  return tokenContract.address;
}

export {deployTokenContract};
