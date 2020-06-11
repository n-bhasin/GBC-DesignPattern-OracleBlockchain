import React from "react";
import "./App.css";
import SetStock from "./components/setStock";
import GetStock from "./components/getStock";
import { Container, Col, Row, Navbar } from "react-bootstrap";
function App() {
  return (
    <Container fluid>
      <Navbar bg="light">
        <Navbar.Brand style={{ marginLeft: "470px" }}>
          <h1>STOCK PRICE</h1>
        </Navbar.Brand>
      </Navbar>
      <Row>
        <Col>
          <SetStock />
        </Col>
        <Col>
          <GetStock />
        </Col>
      </Row>
      <Navbar bg="light">
        <Navbar.Brand style={{ marginLeft: "470px" }}>
          Made By: Bhasin Neeraj
        </Navbar.Brand>
      </Navbar>
      <Row></Row>
    </Container>
  );
}

export default App;
