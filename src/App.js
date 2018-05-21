import React, { Component } from 'react'; 
import './App.css';
import BusMapContainer from './Components/BusMapContainer';
import Filter from './Components/Filter';
import RouteSummaryContainer from './Components/RouteSummaryContainer';
import JourneyPerformanceBarChart from './Components/JourneyPerformanceBarChart';
import AverageJourneyPerformance from './Components/AverageJourneyPerformance';
import { Grid, Row, Col, Panel, Label } from 'react-bootstrap';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const URL_ROOT = 'https://group5host.ccnysd17.org/api/';
const METRICS_API = 'http://api.busturnaround.nyc/api/v1/';
const defaultBusRoute = "";
const defaultDirection = {direction: "", value: -1};
const defaultBusRouteGeo = {};
const defaultStation = {station: "", value: -1};
const defaultWeekRange = {label: "", value: -1};
const defaultTimeRange = {label: "", value: -1};
const defaultDateRange = {label: "", value: ""};
const emptyData = [];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busRoute: defaultBusRoute,
      direction: defaultDirection,
      busRouteGeo: defaultBusRouteGeo,
      startStation: defaultStation,
      endStation: defaultStation,
      weekInterval: defaultWeekRange,
      timeInterval: defaultTimeRange,
      dateInterval: defaultDateRange,
      // Metrics
      ewtByRoute: 0,
      latenessFactorByRoute: 0,
      avgSpeedByRoute: 0,
      excessWaitTimeByStopsData: emptyData
    }

    this.loadBusRoute = this.loadBusRoute.bind(this);
    this.handleBusRouteChange = this.handleBusRouteChange.bind(this);
    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleStartStation = this.handleStartStation.bind(this);
    this.handleEndStation = this.handleEndStation.bind(this);
    this.handleWeekInterval = this.handleWeekInterval.bind(this);
    this.handleTimeInterval = this.handleTimeInterval.bind(this);
    this.handleDateInterval = this.handleDateInterval.bind(this);
    this.grabEWTByStopsData = this.grabEWTByStopsData.bind(this);
    this.grabETWroute = this.grabETWroute.bind(this);
    this.grabLatenessFactorRoute = this.grabLatenessFactorRoute.bind(this);
    this.grabAvgSpeedRoute = this.grabAvgSpeedRoute.bind(this);
  }

  loadBusRoute() {
    const busRoute = this.state.busRoute;
    const direction = this.state.direction !== null ? this.state.direction.value : -1;
    
    if(direction >= 0) {
      let endpoint = `geo/bus-route/${busRoute}/bus-direction/${direction}`;
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
        weekInterval: defaultWeekRange,
        timeInterval: defaultTimeRange,
        dateInterval: defaultDateRange,
        excessWaitTimeByStopsData: emptyData
      });
    } else {
      this.setState({
        busRoute: defaultBusRoute,
        direction: defaultDirection,
        busRouteGeo: defaultBusRouteGeo,
        weekInterval: defaultWeekRange,
        timeInterval: defaultTimeRange,
        dateInterval: defaultDateRange,
        excessWaitTimeByStopsData: emptyData
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
    // this.grabEWTByStopsData();
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
    console.log(week);
    this.setState({
      weekInterval: week
    });
    
  }

  handleTimeInterval(time) {
    console.log(time);
    this.setState({
      timeInterval: time
    });
  }

  handleDateInterval(date) {
    console.log(date);
    this.setState({
      dateInterval: date
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevBusRoute = prevState.busRoute;
    const prevDirection = prevState.direction.value;
    const prevWeek = prevState.weekInterval.value;
    const prevTime = prevState.timeInterval.value;
    const prevDate = prevState.dateInterval.value;

    const busRoute = this.state.busRoute;
    const direction = this.state.direction.value;
    const week = this.state.weekInterval.value;
    const time = this.state.timeInterval.value;
    const date = this.state.dateInterval.value;

    // console.log("BusRoute:",busRoute);
    // console.log("Direction:",direction);
    // console.log("Week:",week);
    // console.log("Time:",time);
    // console.log("Date:",date);

    if (prevBusRoute!==busRoute || prevDirection!==direction || prevWeek!==week || prevTime!==time || prevDate!==date) {
      if (busRoute !== "" && direction >= 0 && week >= 0 && time >= 0 && date !== "") {
        // console.log('GRAB THE EWT DATA!');
        this.grabEWTByStopsData(busRoute, direction, week, time, date);
        this.grabETWroute(busRoute, direction, week, time, date);
        this.grabLatenessFactorRoute(busRoute, direction, week, time, date);
        this.grabAvgSpeedRoute(busRoute, direction, week, time, date);
      }
    }
  }

  grabEWTByStopsData(busRoute, direction, week, time, date) {
    let url = METRICS_API + "ewt?";
    url += "routes=" + busRoute + "&months=" + date;
    if (week !== 2) {
      url += "&weekend=" + week;
    }
    url += "&periods=" + time;
    url += "&groups=stop_id,direction=" + direction;
    // console.log(PROXY_URL + url);

    fetch(PROXY_URL + url)
      .then(response => response.json())
      .then (data => {
        // console.log(data);
        let ewtByStop = data.map(row => {
          return ({'x': row['stop_name'], 'y': row['ewt']/60});
        });
        this.setState({
          excessWaitTimeByStopsData: ewtByStop
        });
        // console.log(ewtByStop);
      });
  }

  grabETWroute(busRoute, direction, week, time, date) {
    let url = METRICS_API + "ewt?";
    url += "routes=" + busRoute + "&months=" + date;
    if (week !== 2) {
      url += "&weekend=" + week;
    }
    url += "&periods=" + time;
    // console.log(url);

    fetch(PROXY_URL + url)
      .then(response => response.json())
      .then (data => {
        // console.log(data);
        let ewt = data.map(d => d['ewt']/60);
        this.setState({
          ewtByRoute: precisionRound(ewt,2)
        });
      });
  }

  grabLatenessFactorRoute(busRoute, direction, week, time, date) {
    let url = METRICS_API + "otp?";
    url += "routes=" + busRoute + "&months=" + date;
    if (week !== 2) {
      url += "&weekend=" + week;
    }
    url += "&periods=" + time;
    console.log(url);

    fetch(PROXY_URL + url)
      .then(response => response.json())
      .then (data => {
        // console.log(data);
        let late = data.map(d => d['late']);
        this.setState({
          latenessFactorByRoute: precisionRound(late,2)
        });
      });
  }

  grabAvgSpeedRoute(busRoute, direction, week, time, date) {
    let url = METRICS_API + "speed?";
    url += "routes=" + busRoute + "&months=" + date;
    if (week !== 2) {
      url += "&weekend=" + week;
    }
    url += "&periods=" + time;
    console.log(url);

    fetch(PROXY_URL + url)
      .then(response => response.json())
      .then (data => {
        console.log(data);
        let speed = data.map(d => d['speed']);
        this.setState({
          avgSpeedByRoute: precisionRound(speed,2)
        });
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
                      week={this.state.weekInterval.label}
                      time={this.state.timeInterval.label}
                      date={this.state.dateInterval.label}
                      updateBusRoute={this.handleBusRouteChange}
                      updateDirection={this.handleDirectionChange}
                      updateStartStation={this.handleStartStation}
                      updateEndStation={this.handleEndStation}
                      updateWeek={this.handleWeekInterval}
                      updateTime={this.handleTimeInterval}
                      updateDate={this.handleDateInterval}
                      />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <RouteSummaryContainer  excessWaitTime={this.state.ewtByRoute}
                                      routeLatenessFactor={this.state.latenessFactorByRoute}
                                      avgSpeed={this.state.avgSpeedByRoute}
                                      ewtByStop={this.state.excessWaitTimeByStopsData}
                                      />
            </Col>
          </Row>

          <Row  >
            <Panel>
              <Panel.Heading className="text-left">Stop-By-Stop Journey</Panel.Heading>
              <Grid>
                <Row>
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

                  <Col md={4}>
                    <Label className="text-center">Your Journey Performance</Label>
                    <JourneyPerformanceBarChart />
                  </Col>

                  <Col md={4}>
                    <Label className="text-center">Average Journey Performance</Label>
                    <AverageJourneyPerformance />
                  </Col>
                </Row>
              </Grid>
            </Panel>
          </Row>

        </Grid>
      </div>
    );
  }
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export default App;