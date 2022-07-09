import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as TokenArtifact from "../artifacts/contracts/Token.sol/Token.json";

// eslint-disable-next-line node/no-missing-import
import { Token } from "../typechain";
import { sign } from "crypto";

async function transferToken(
  tokenAddress: string,
  ownerSigner: ethers.Wallet,
  signer2: ethers.Wallet,
  transferAmount: string,
  transferToAddress2: string,
  transferAmount2: string
) 
{
  const tokenContract: Token = new Contract(
    tokenAddress,
    TokenArtifact.abi,
    ownerSigner
  ) as Token;

  let balance = await tokenContract.balanceOf(signer2.address);
  console.log(` account ${signer2.address} balance before transfer ${balance.toString()}`);

  console.log(` transfering tokens`);
  console.log(` transfer ${transferAmount} tokens to address ${signer2.address} from ${ownerSigner.address}`);
  let tx = await tokenContract.transfer(
    signer2.address, 
    transferAmount
  );
  await tx.wait(1);
  console.log(" transfer transacton ", tx.hash);
  balance = await tokenContract.balanceOf(signer2.address);
  console.log(` account ${signer2.address} balance after transfer ${balance.toString()}`);

  balance = await tokenContract.balanceOf(transferToAddress2);
  console.log(` account ${transferToAddress2} balance before transfer ${balance.toString()}`);
  
  console.log(` transfering tokens`);
  console.log(` transfer {transferAmount2} tokens to address ${transferToAddress2} from ${signer2.address}`);
  tx = await tokenContract.connect(signer2).transfer(
    transferToAddress2, transferAmount2
  );
  await tx.wait(1);
  console.log(" transfer transaction", tx.hash);

  balance = await tokenContract.balanceOf(signer2.address);
  console.log(` account ${signer2.address} balance after transfer ${balance.toString()}`);

  balance = await tokenContract.balanceOf(transferToAddress2);
  console.log(` account ${transferToAddress2} balance after transfer ${balance.toString()}`);
}

export { transferToken };
