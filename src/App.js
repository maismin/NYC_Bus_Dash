import React, { Component } from 'react'; 
import './App.css';
import BusMapContainer from './Components/BusMapContainer';
import FilterContainer from './Components/FilterContainer';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <Row className="show-grid" >
            <Col md={12}>
              <FilterContainer />
            </Col>
          </Row>

          <Row className="show-grid" >
            <Col md={12}>
              
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

export default App;