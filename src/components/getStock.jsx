import React from "react";
import { Button, InputGroup, FormControl, Card } from "react-bootstrap";
import { StockVolume, StockPrice } from "../blockchain/contractSetup";

const GetStock = () => {
  const [symbol, SetSymbol] = React.useState("");
  const [result, getResult] = React.useState("");

  const getPrice = async () => {
    const receipt = await StockPrice(symbol);
    console.log(receipt);
    getResult(receipt);
  };
  const getVolume = async () => {
    const receipt = await StockVolume(symbol);
    getResult(receipt);
  };
  return (
    <div>
      <h1>Get Stock</h1>
      <InputGroup size="lg" className="mb-3">
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          style={{
            borderRadius: "50px",
            backgroundColor: "#F0F2F5",
            border: 0,
            caretColor: "#007bff",
          }}
          placeholder="Enter Your Symbol"
          className="customInput"
          onChange={(e) => SetSymbol(e.target.value)}
          autoFocus
        />
      </InputGroup>
      <Button
        type="button"
        onClick={getVolume}
        variant="primary"
        style={{ marginRight: "10px" }}
        className="mb-3"
      >
        Volume
      </Button>
      <Button
        type="button"
        onClick={getPrice}
        variant="primary"
        className="mb-3"
      >
        Price
      </Button>
      <Card>
        <Card.Body style={{ backgroundColor: "#F0F2F5" }}>
          RESULT: {result}.
        </Card.Body>
      </Card>
    </div>
  );
};

export default GetStock;
