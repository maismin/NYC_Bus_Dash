import React from 'react'; 
import PropTypes from 'prop-types';
import BusRouteDropdown from './BusRouteDropdown';
import DirectionDropdown from './DirectionDropdown';
import BusStationDropDown from './BusStationDropDown';

const Filter = ({ busRoute, direction, updateBusRoute, updateDirection, updateStartStation, updateEndStation}) => (
  <div>
    Bus Route
    <BusRouteDropdown
      value={busRoute}
      updateValue={updateBusRoute}
    />
    Directions
    <DirectionDropdown
      updateValue={updateDirection}
      busRoute={busRoute}
    />
    Start Station
    <BusStationDropDown
      busRoute={busRoute}
      direction={direction}
      updateStation={updateStartStation}
    />
    End Station
    <BusStationDropDown
      busRoute={busRoute}
      direction={direction}
      updateStation={updateEndStation}
    />
  </div>
)

Filter.propTypes = {
  busRoute: PropTypes.string,
  direction: PropTypes.object,
  updateBusRoute: PropTypes.func,
  updateDirection: PropTypes.func,
  updateStartStation: PropTypes.func,
  updateEndStation: PropTypes.func
}

export default Filter;