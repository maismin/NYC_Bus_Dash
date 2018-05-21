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
const defaultStation = {station: "", value: -1, sequence: -1};
const defaultWeekRange = {label: "", value: -1};
const defaultTimeRange = {label: "", value: -1};
const defaultDateRange = {label: "", value: ""};
const emptyData = [];
var _ = require('lodash');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busRoute: defaultBusRoute,
      direction: defaultDirection,
      busRouteGeo: defaultBusRouteGeo,
      busStations: [],
      startStation: defaultStation,
      endStation: defaultStation,
      weekInterval: defaultWeekRange,
      timeInterval: defaultTimeRange,
      dateInterval: defaultDateRange,
      // Metrics
      ewtByRoute: 0,
      latenessFactorByRoute: 0,
      avgSpeedByRoute: 0,
      excessWaitTimeByStopsData: emptyData,
      ewtByJourney: emptyData
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
    this.grabJourPerf = this.grabJourPerf.bind(this);
  }

  loadBusRoute() {
    const busRoute = this.state.busRoute;
    const direction = this.state.direction !== null ? this.state.direction.value : -1;
    
    if(direction >= 0) {
      let endpoint = `geo/bus-route/${busRoute}/bus-direction/${direction}`;
      let url = URL_ROOT + endpoint;
      // console.log(`URL:${url}`);
      fetch(url)
        .then(response => response.json())
        .then(busRouteGeo => {
          // console.log(busRouteGeo.properties.route_id);
          // const route_id = busRouteGeo.properties.route_id;
          this.setState({ 
            busRouteGeo
          });
        });
      // this.updateBusStations();
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
        ewtByRoute: 0,
        latenessFactorByRoute: 0,
        avgSpeedByRoute: 0,
        excessWaitTimeByStopsData: emptyData,
        ewtByJourney: emptyData
      });
    } else {
      this.setState({
        busRoute: defaultBusRoute,
        direction: defaultDirection,
        busRouteGeo: defaultBusRouteGeo,
        weekInterval: defaultWeekRange,
        timeInterval: defaultTimeRange,
        dateInterval: defaultDateRange,
        ewtByRoute: 0,
        latenessFactorByRoute: 0,
        avgSpeedByRoute: 0,
        excessWaitTimeByStopsData: emptyData,
        ewtByJourney: emptyData
      });
    }
  }

  handleDirectionChange(target) {
    // console.log("Previous: ",this.state.direction, "| Current: ", target);
    // console.log(target);

    const direction = target === null ? defaultDirection : target;
    const busRoute = this.state.busRoute;
    let busStations = [];

    if (busRoute!=="" && direction.value>-1) {
      let busStationPath = `stop-ids/bus-route/${busRoute}/bus-direction/${direction.value}`;
      let URL = URL_ROOT + busStationPath;
      fetch(URL)
        .then(response => response.json())
        .then(busStations => {
          busStations = busStations.map(obj => obj.stop_id);
          // console.log('bus stations');
          // console.log(busStations);
          this.setState({
            busStations,
            direction,
            busRouteGeo: defaultBusRouteGeo,
            startStation: defaultStation,
            endStation: defaultStation,
          }, this.loadBusRoute);
        });
    } else {
      this.setState({
        direction,
        busRouteGeo: defaultBusRouteGeo,
        startStation: defaultStation,
        endStation: defaultStation,
      }, this.loadBusRoute);
    }
  }

  handleStartStation(busStation) {
    // console.log(busStation);
    const startStation = busStation === null ? defaultStation : busStation;
    this.setState({
      startStation,
      busRouteGeo: defaultBusRouteGeo
    }, this.loadBusRoute);
  }

  handleEndStation(busStation) {
    // console.log(busStation);
    const endStation = busStation === null ? defaultStation : busStation;
    this.setState({
      endStation,
      busRouteGeo: defaultBusRouteGeo
    }, this.loadBusRoute);
  }

  handleWeekInterval(week) {
    // console.log(week);
    this.setState({
      weekInterval: week
    });  
  }

  handleTimeInterval(time) {
    // console.log(time);
    this.setState({
      timeInterval: time
    });
  }

  handleDateInterval(date) {
    // console.log(date);
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
    const prevStartStation = prevState.startStation.value;
    const prevEndStation = prevState.endStation.value;

    const busRoute = this.state.busRoute;
    const direction = this.state.direction.value;
    const week = this.state.weekInterval.value;
    const time = this.state.timeInterval.value;
    const date = this.state.dateInterval.value;
    const startStation = this.state.startStation.value;
    const endStation = this.state.endStation.value;
    const ewtByJourney = this.state.ewtByJourney;

    // console.log("BusRoute:",busRoute);
    // console.log("Direction:",direction);
    // console.log("Week:",week);
    // console.log("Time:",time);
    // console.log("Date:",date);
    // console.log('prevSS:', prevStartStation);
    // console.log('prevES:', prevEndStation);
    // console.log('SS:', startStation);
    // console.log('ES:', endStation);

    if (prevBusRoute!==busRoute || prevDirection!==direction || prevWeek!==week || prevTime!==time || prevDate!==date) {
      if (busRoute !== "" && direction >= 0 && week >= 0 && time >= 0 && date !== "") {
        // console.log('GRAB THE EWT DATA!');
        this.grabEWTByStopsData(busRoute, direction, week, time, date);
        this.grabETWroute(busRoute, direction, week, time, date);
        this.grabLatenessFactorRoute(busRoute, direction, week, time, date);
        this.grabAvgSpeedRoute(busRoute, direction, week, time, date); 

      }
    }

    if (busRoute !== "" && direction >= 0 && week >= 0 && time >= 0 && date !== "" && startStation > -1 && endStation > -1 && _.isEmpty(ewtByJourney)) {
      // console.log('start end!');
      this.grabJourPerf(busRoute, direction, week, time, date, startStation, endStation);
    }
  }

  grabEWTByStopsData(busRoute, direction, week, time, date) {
    // console.log('getting new ewt by stops data');
    const busStations = this.state.busStations;
    // console.log(busStations);
    console.log(busStations.join());
    let url = METRICS_API + "ewt?";
    url += "routes=" + busRoute + "&months=" + date;
    if (week !== 2) {
      url += "&weekend=" + week;
    }
    url += "&periods=" + time;
    url += "&stops=" + busStations.join();
    url += "&groups=stop_id,direction=" + direction;
    // url += "&order=-stop_id";
    // console.log(url);

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
    const busStations = this.state.busStations;
    // console.log(busStops);
    let url = METRICS_API + "ewt?";
    url += "routes=" + busRoute + "&months=" + date;
    if (week !== 2) {
      url += "&weekend=" + week;
    }
    url += "&periods=" + time;
    url += "&stops=" + busStations.join();
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
    const busStations = this.state.busStations;
    let url = METRICS_API + "otp?";
    url += "routes=" + busRoute + "&months=" + date;
    if (week !== 2) {
      url += "&weekend=" + week;
    }
    url += "&periods=" + time;
    url += "&stops=" + busStations.join();
    // console.log(url);

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
    const busStations = this.state.busStations;
    let url = METRICS_API + "speed?";
    url += "routes=" + busRoute + "&months=" + date;
    if (week !== 2) {
      url += "&weekend=" + week;
    }
    url += "&periods=" + time;
    url += "&stops=" + busStations.join();
    // console.log(url);

    fetch(PROXY_URL + url)
      .then(response => response.json())
      .then (data => {
        // console.log(data);
        let speed = data.map(d => d['speed']);
        this.setState({
          avgSpeedByRoute: precisionRound(speed,2)
        });
      });
  }

  grabJourPerf(busRoute, direction, week, time, date, startStation, endStation) {
    // api call to get all the stops between start and end stops
    const startStationID = this.state.startStation.value;
    const endStationID = this.state.endStation.value;
    const busStations = this.state.busStations;
    // console.log(busStations);
    const startIndex = _.indexOf(busStations, startStationID);
    const endIndex = _.indexOf(busStations, endStationID);
    const busStationsSlice = busStations.slice(startIndex, endIndex+1);
    // console.log(startStationID);
    // console.log(endStationID);
    // console.log(busStations);
    // console.log(busStationsSlice);
    
    let url = METRICS_API + "ewt?";
    url += "routes=" + busRoute + "&months=" + date;
    if (week !== 2) {
      url += "&weekend=" + week;
    }
    url += "&periods=" + time;
    url += "&stops=" + busStationsSlice.join();
    console.log(url);

    fetch(PROXY_URL + url)
      .then(response => response.json())
      .then (data => {
        // console.log(data[0].swt, data[0].awt);
        let ewtByJourney = [];
        let d = {'x': 'Scheduled', 'y': data[0].swt/60};
        let e = {'x': 'Actual', 'y': data[0].awt/60};
        ewtByJourney.push(d,e);
        console.log(ewtByJourney);
        // let ewtByJourney = data.map(row => {
        //   return ({'x': row['stop_name'], 'y': row['ewt']/60});
        // });
        this.setState({
          ewtByJourney
        })
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
                    <JourneyPerformanceBarChart data={this.state.ewtByJourney}/>
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