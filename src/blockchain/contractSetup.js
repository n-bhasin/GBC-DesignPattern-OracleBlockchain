import Web3 from "web3";
import stockOracle from "../contracts/stockOracle.json";
const web3 = new Web3("http://localhost:9545");
const oracleContract = new web3.eth.Contract(
  stockOracle.abi,
  stockOracle.networks[5777].address
);
let accounts = [];
web3.eth
  .getAccounts()
  .then((res) => (accounts = res))
  .catch((e) => console.log(e));

//exports the setStock function
export const storingStocks = async (symbol, price, volume) => {
  const symbolInBytes = web3.utils.fromAscii(symbol);
  const receipt = await oracleContract.methods
    .setStock(symbolInBytes, price, volume)
    .send({ from: accounts[0] });
  console.log(receipt);
};

export const StockPrice = async (symbol) => {
  const symbolInBytes = web3.utils.fromAscii(symbol);
  const receipt = await oracleContract.methods
    .getStockPrice(symbolInBytes)
    .call({ from: accounts[0] });
  console.log(receipt);
  return receipt;
};
export const StockVolume = async (symbol) => {
  const symbolInBytes = web3.utils.fromAscii(symbol);
  console.log(symbolInBytes);
  const receipt = await oracleContract.methods
    .getStockVolume(symbolInBytes)
    .call({ from: accounts[0] });
  console.log(receipt);
  return receipt;
};
