import React, { Component } from 'react'; 
import './App.css';
import BusMapContainer from './Components/BusMapContainer';
import Filter from './Components/Filter';
import RouteSummaryContainer from './Components/RouteSummaryContainer';
import { Grid, Row, Col } from 'react-bootstrap';

const URL_ROOT = 'https://group5host.ccnysd17.org/api/';
const defaultBusRoute = "";
const defaultDirection = {direction: "", value: -1};
const defaultBusRouteGeo = {};
const defaultStation = {station: "", value: -1};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busRoute: defaultBusRoute,
      startDate: null,
      endDate: null,
      direction: defaultDirection,
      busRouteGeo: defaultBusRouteGeo,
      startStation: defaultStation,
      endStation: defaultStation
    }

    this.loadBusRoute = this.loadBusRoute.bind(this);
    this.handleBusRouteChange = this.handleBusRouteChange.bind(this);
    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleStartStation = this.handleStartStation.bind(this);
    this.handleEndStation = this.handleEndStation.bind(this);
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

  handleStartStation(busStation) {
    const startStation = busStation === null ? defaultStation : busStation;
    this.setState({
      startStation,
      busRouteGeo: defaultBusRouteGeo
    }, this.loadBusRoute);
  }

  handleEndStation(busStation) {
    const endStation = busStation === null ? defaultStation : busStation;
    this.setState({
      endStation,
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
          <Row  >
            <Col md={12}>
              <Filter busRoute={this.state.busRoute}
                      direction={this.state.direction}
                      updateBusRoute={this.handleBusRouteChange}
                      updateDirection={this.handleDirectionChange}
                      updateStartStation={this.handleStartStation}
                      updateEndStation={this.handleEndStation}
                      />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <RouteSummaryContainer  excessWaitTime={5}
                                      routeLatenessFactor={5}
                                      avgSpeed={8}
                                      />
            </Col>
          </Row>

          <Row  >
            <Col md={4}>
              <BusMapContainer busRoute={this.state.busRoute}
                               geo={this.state.busRouteGeo}
                               direction={this.state.direction}
                               updateBusRoute={this.handleBusRouteChange}
                               updateDirection={this.handleDirectionChange}
                               updateStartStation={this.handleStartStation}
                               updateEndStation={this.handleEndStation}
                               />              
            </Col>

            <Col md={8}>
                         
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

export default App;