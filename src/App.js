import React, { Component } from 'react';
import './App.css';
import { Grid, Row, Col } from 'react-bootstrap'
import Votes from "./components/votes";
import Buttons from "./components/orderbuttons";

class App extends Component {
  render() {
    return (
      <Grid>
        <Row className="">
          <Col md={8} mdOffset={2} >
            <h1>Blog posts populares</h1>
            <Buttons />
            <Votes />
          </Col>
        </Row>
    </Grid>
    );
  }
}
export default App;
