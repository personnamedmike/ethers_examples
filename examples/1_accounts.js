require("dotenv").config();

const { ethers } = require("ethers");

const INFURA_ID = "53a7d068912c46a3ac9b9517b45b97dc";
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);

const address = "0x004b2cD7B8126590122b2eAAF47A963E9191Be30";

const main = async () => {
  const balance = await provider.getBalance(address);
  console.log(
    `\nETH balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`
  );
};
main();
