import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Form,
  FormControl,
  ListGroup,
  Col,
  Row,
} from "react-bootstrap";

import { storingStocks } from "../blockchain/contractSetup";

const SetStock = () => {
  const [search, setSearch] = useState("BA");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=Y9GA0VNUZJA40GGY`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.bestMatches) {
          setSearchList(data.bestMatches);
        } else {
          setSearchList([]);
        }
      })
      .catch((e) => console.log(e));
  }, [search]);

  const addToBlockchain = async (result) => {
    if (result) {
      fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${result["1. symbol"]}&apikey=Y9GA0VNUZJA40GGY`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data["Global Quote"]) {
            storingStocks(
              data["Global Quote"]["01. symbol"],
              parseInt(data["Global Quote"]["05. price"]),
              parseInt(data["Global Quote"]["06. volume"])
            );
            alert("Stock is added.");
          } else {
            alert("There is some Problem.");
          }
        })
        .catch((e) => alert(e));
    }
  };

  return (
    <div>
      <h1> SET SYMBOL</h1>
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
          placeholder="Search Your Stock"
          className="customInput"
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
      </InputGroup>

      {searchList.length > 0 &&
        searchList.map((result) => {
          return (
            <Row>
              <Col>
                <ListGroup
                  variant="flush"
                  //   style={{ padding: "0px" }}
                  key={result["1. symbol"]}
                >
                  <ListGroup.Item
                    key={result["1. symbol"]}
                    style={{
                      backgroundColor: "#f0f2f5",
                      display: "flex",
                      marginBottom: "5px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {result["2. name"]}
                    <Form.Text className="text-muted">
                      {result["1. symbol"]}
                    </Form.Text>
                  </ListGroup.Item>
                </ListGroup>{" "}
              </Col>
              <Col>
                <button
                  className="btn btn-primary"
                  style={{ fontSize: "18px" }}
                  onClick={() => addToBlockchain(result)}
                >
                  +
                </button>
              </Col>
            </Row>
          );
        })}
    </div>
  );
};

export default SetStock;
