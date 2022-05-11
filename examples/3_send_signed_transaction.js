const { ethers } = require("ethers");
require("dotenv").config();

const INFURA_ID = process.env.INFURA_API_KEY;
const provider = new ethers.providers.JsonRpcProvider(
  `https://rinkeby.infura.io/v3/${INFURA_ID}`
);

const account1 = process.env.ACCOUNT1;
const account2 = process.env.ACCOUNT2;

const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;

const wallet = new ethers.Wallet(PRIVATE_KEY1, provider);

const main = async () => {
  // Show account1 balance before teransfer
  const senderBalanceBefore = await provider.getBalance(account1);
  // Show account2 balance before teransfer
  const receiverBalanceBefore = await provider.getBalance(account2);

  console.log(
    `\nSender balance after: ${ethers.utils.formatEther(senderBalanceBefore)}`
  );
  console.log(
    `\nreceiver balance after: ${ethers.utils.formatEther(
      receiverBalanceBefore
    )}`
  );

  // Send Ether
  const tx = await wallet.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther("0.025"),
  });

  //   Wait for tx to be mined
  await tx.wait();
  console.log(tx);

  // Show account1 balance after teransfer
  // Show account2 balance after teransfer
  const senderBalanceAfter = await provider.getBalance(account1);
  const receiverBalanceAfter = await provider.getBalance(account2);

  console.log(
    `\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`
  );
  console.log(
    `\nreceiver balance after: ${ethers.utils.formatEther(
      receiverBalanceAfter
    )}`
  );
};

main();
