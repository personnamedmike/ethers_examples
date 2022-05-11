const { ethers } = require("ethers");

const INFURA_ID = "53a7d068912c46a3ac9b9517b45b97dc";
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
];

const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI Contract address
const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const balanceOf = await contract.balanceOf(
    "0x8c19cf0135852ba688643f57d56be72bb898c411"
  );

  console.log(`\nreading from ${address}\n`);
  console.log(`name: ${name}`);
  console.log(`symbol: ${symbol}`);
  console.log(`total supply: ${ethers.utils.formatEther(totalSupply)}`);
  console.log(`Balance returned: ${ethers.utils.formatEther(balanceOf)}`);
};

main();
