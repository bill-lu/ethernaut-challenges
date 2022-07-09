import {getSigner, getAccountAddress} from "./accountsService";
import "dotenv/config";
import { ethers } from "ethers";

import {deployTokenContract} from "./deployTokenContract";
import {transferToken} from "./transferToken";

const secondTransferAmout = "115792089237316195423570985008687907853269984665640564039457584007913129639933";

async function main() 
{
    const ownerSigner = await getSigner(
      process.env.PRIVATE_KEY_2,
      process.env.MNEMONIC,
      "rinkeby"
    );

    const secondSigner = await getSigner(
      process.env.PRIVATE_KEY_1,
      process.env.MNEMONIC,
      "rinkeby"
    );

    const secondTransferToAddress = await getAccountAddress(4);
    console.log(` Second transferTo address ${secondTransferToAddress}`);

    const tokenContractAddress = await deployTokenContract(
      ownerSigner, 
    );

    await transferToken(
      tokenContractAddress, 
      ownerSigner, 
      secondSigner,
      secondTransferAmout,
      secondTransferToAddress?secondTransferAmout: "",
      secondTransferAmout
    );

  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });