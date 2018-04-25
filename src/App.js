import React, { Component } from 'react'; 
import './App.css';
import BusMapContainer from './Components/BusMapContainer';
import FilterContainer from './Components/FilterContainer';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busRoute: "",
      startDate: null,
      endDate: null,
      direction: {direction: "", value: -1}
    }

    this.handleBusRouteChange = this.handleBusRouteChange.bind(this);
    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
  }

  handleBusRouteChange(target) {
    // console.log(typeof target.busName)
    // console.log(target)
    if (target) {
      this.setState({
        busRoute: target.busRoute
      });
    } else {
      this.setState({
        busRoute: "",
        direction: ""
      });
    }
  }

  handleDirectionChange(target) {
    // console.log("Previous: ",this.state.direction, "| Current: ", target);
    console.log(target);
    this.setState({
      direction: target
    });
  }

  handleStartDate(date) {
    this.setState({
      startDate: date
    });
    //console.log(typeof this.state.startDate);
    console.log(typeof date._d);
    console.log(date._d);
  }

  handleEndDate(date) {
    this.setState({
      endDate: date
    });
    console.log(this.state.endDate);
  }

  handleSubmit() {
  }

  render() {
    return (
      <div className="App">
        <Grid>
          <Row className="show-grid" >
            <Col md={12}>
              <FilterContainer busRoute={this.state.busRoute}
                               updateBusRoute={this.handleBusRouteChange}
                               updateDirection={this.handleDirectionChange}
                               />
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