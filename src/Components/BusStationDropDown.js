import React, { Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select';

// Make sure to import default styles.
// This only needs to be done once; probably during bootstrapping process.
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

import '../CSS/virtualizedSelect.css';

const hostURL = 'https://group5host.ccnysd17.org/api/';
const defaultBusRoute = "";
const defaultDirection = {direction: "", value: -1};
const defaultStation = {station: "", value: -1};

const labelKey = "station";
const valueKey = "value";

let isLoadingExternally = false;

class BusStationDropDown extends Component {
  constructor(props) {
    super(props);

      this.state = {
        busStops: [],
        direction: defaultDirection,
        station: defaultStation
      }

      this.changeStartStation = this.changeStartStation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const busRoute = nextProps.busRoute;
    const direction = nextProps.direction;
    const directionState = this.state.direction;
    // console.log('BusStation received props');

    if (busRoute.length === 0) {
      // console.log("Resetting");
      this.setState({
        busStops: [],
        busRoute: defaultBusRoute,
        direction: defaultDirection,
        station: defaultStation
      });
    } else {
      if (direction.value >= 0 && direction.value !== directionState.value) {
        // console.log('grab bus stations');
        isLoadingExternally = true;
        let busStationPath = `bus-stations/bus-route/${busRoute}/bus-direction/${direction.value}`;
        let URL = hostURL + busStationPath;
        fetch(URL)
          .then(response => response.json())
          .then(busStops => {

            busStops = busStops.map((busStop, index) => {
              return {'station': busStop.station, 'value': index};
            });
            // console.log(busStops);            
            isLoadingExternally = false;
            this.setState({ 
              busStops, 
              direction, 
              station: defaultStation
            });
          });
      }
    }
  }

  changeStartStation(target) {
    this.setState({
      station: target
    })
    this.props.updateStation(target)
  }

  render() {
    return (
      <VirtualizedSelect
          options={this.state.busStops}  
          value={this.state.station}
          onChange={this.changeStartStation}
          clearable
          searchable
          simpleValue={false}
          labelKey={labelKey}
          valueKey={valueKey}
          isLoading={isLoadingExternally}
      />
    )
  }
}

export default BusStationDropDown;