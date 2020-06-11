const stockOracle = artifacts.require("stockOracle");

module.exports = function (deployer) {
  deployer.deploy(stockOracle);
};
