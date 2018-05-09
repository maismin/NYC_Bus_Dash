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
      direction: defaultDirection,
      busRouteGeo: defaultBusRouteGeo,
      startStation: defaultStation,
      endStation: defaultStation,
      weekInterval: "",
      timeInterval: ""
    }

    this.loadBusRoute = this.loadBusRoute.bind(this);
    this.handleBusRouteChange = this.handleBusRouteChange.bind(this);
    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleStartStation = this.handleStartStation.bind(this);
    this.handleEndStation = this.handleEndStation.bind(this);
    this.handleWeekInterval = this.handleWeekInterval.bind(this);
    this.handleTimeInterval = this.handleTimeInterval.bind(this);
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
        busRouteGeo: defaultBusRouteGeo,
        weekInterval: "",
        timeInterval: ""
      });
    } else {
      this.setState({
        busRoute: defaultBusRoute,
        direction: defaultDirection,
        busRouteGeo: defaultBusRouteGeo,
        weekInterval: "",
        timeInterval: ""
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

  handleWeekInterval(week) {
    console.log(week.value);
    this.setState({
      weekInterval: week.value
    });
  }

  handleTimeInterval(time) {
    console.log(time.value);
    this.setState({
      timeInterval: time.value
    });
  }

  render() {
    return (
      <div className="App">
        <Grid>
          <Row  >
            <Col md={12}>
              <Filter busRoute={this.state.busRoute}
                      direction={this.state.direction}
                      week={this.state.weekInterval}
                      time={this.state.timeInterval}
                      updateBusRoute={this.handleBusRouteChange}
                      updateDirection={this.handleDirectionChange}
                      updateStartStation={this.handleStartStation}
                      updateEndStation={this.handleEndStation}
                      updateWeek={this.handleWeekInterval}
                      updateTime={this.handleTimeInterval}
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