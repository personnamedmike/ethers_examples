const { ethers } = require("ethers");
require("dotenv").config();

const INFURA_ID = process.env.INFURA_API_KEY;
const provider = new ethers.providers.JsonRpcProvider(
  `https://rinkeby.infura.io/v3/${INFURA_ID}`
);

const account1 = process.env.ACCOUNT1; // Your account address 1
const account2 = process.env.ACCOUNT2; // Your account address 2

const privateKey1 = process.env.PRIVATE_KEY1; // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider);

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
];

const address = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709";

const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {
  const balance = await contract.balanceOf(account1);

  console.log(`\nReading from ${address}\n`);
  console.log(`Balance of sender ${balance}\n`);

  const contractWithWallet = contract.connect(wallet);

  const tx = await contractWithWallet.transfer(account2, balance);
  await tx.wait();

  console.log(tx);

  const balanceOfSender = await contract.balanceOf(account1);
  const balanceOfReceiver = await contract.balanceOf(account2);

  console.log(`\nBalance of sender: ${balanceOfSender}\n`);
  console.log(`Balance of receiver: ${balanceOfReceiver}`);
};

main();
