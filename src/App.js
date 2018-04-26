import React, { Component } from 'react'; 
import './App.css';
import BusMapContainer from './Components/BusMapContainer';
import Filter from './Components/Filter';
import { Grid, Row, Col } from 'react-bootstrap';

const URL_ROOT = 'https://group5host.ccnysd17.org/api/';
const defaultBusRoute = "";
const defaultDirection = {direction: "", value: -1};
const defaultBusRouteGeo = {};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busRoute: defaultBusRoute,
      startDate: null,
      endDate: null,
      direction: defaultDirection,
      busRouteGeo: defaultBusRouteGeo
    }

    this.loadBusRoute = this.loadBusRoute.bind(this);
    this.handleBusRouteChange = this.handleBusRouteChange.bind(this);
    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
  }

  loadBusRoute() {
    const busRoute = this.state.busRoute;
    const direction = this.state.direction !== null ? this.state.direction.value : -1;
    
    if(direction >= 0) {
      let endpoint = `geo/bus-route/bus-route/${busRoute}/bus-direction/${direction}`;
      let url = URL_ROOT + endpoint;
      console.log(`URL:${url}`);
      fetch(url)
        .then(response => response.json())
        .then(busRouteGeo => {
          // console.log(busRouteGeo.properties.route_id);
          // const route_id = busRouteGeo.properties.route_id;
          this.setState({ 
            busRouteGeo
          });
        });
    }
  }

  handleBusRouteChange(target) {
    // console.log(typeof target.busName)
    // console.log(target)
    if (target) {
      this.setState({
        busRoute: target.busRoute,
        direction: defaultDirection,
        busRouteGeo: defaultBusRouteGeo
      });
    } else {
      this.setState({
        busRoute: defaultBusRoute,
        direction: defaultDirection,
        busRouteGeo: defaultBusRouteGeo
      });
    }
  }

  handleDirectionChange(target) {
    // console.log("Previous: ",this.state.direction, "| Current: ", target);
    // console.log(target);

    const direction = target === null ? defaultDirection : target;
    this.setState({
      direction,
      busRouteGeo: defaultBusRouteGeo
    }, this.loadBusRoute);
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
              <Filter busRoute={this.state.busRoute}
                               updateBusRoute={this.handleBusRouteChange}
                               updateDirection={this.handleDirectionChange}
                               />
            </Col>
          </Row>

          <Row className="show-grid" >
            <Col md={12}>
              <BusMapContainer busRoute={this.state.busRoute}
                               geo={this.state.busRouteGeo}
                               direction={this.state.direction}
                               updateBusRoute={this.handleBusRouteChange}
                               updateDirection={this.handleDirectionChange}
                               />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

export default App;