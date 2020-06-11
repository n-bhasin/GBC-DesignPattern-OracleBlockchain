//SPDX-License-Identifier:MIT
pragma solidity 0.6.0;


contract stockOracle {
    struct stock {
        uint256 price;
        uint256 volume;
    }
    mapping(bytes4 => stock) public stockQuote;
    address public oracleOwner;

    constructor() public {
        oracleOwner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == oracleOwner, "stockOracle:only Owner");
        _;
    }

    function setStock(
        bytes4 symbol,
        uint256 price,
        uint256 volume
    ) public onlyOwner {
        stock memory quote = stock(price, volume);
        stockQuote[symbol] = quote;
    }

    function getStockPrice(bytes4 symbol) public view returns (uint256) {
        return stockQuote[symbol].price;
    }

    function getStockVolume(bytes4 symbol) public view returns (uint256) {
        return stockQuote[symbol].volume;
    }
}
