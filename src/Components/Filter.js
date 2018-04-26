import React from 'react'; 
import PropTypes from 'prop-types';
import BusRouteDropdown from './BusRouteDropdown';
import DirectionDropdown from './DirectionDropdown';

const Filter = ({ busRoute, updateBusRoute, updateDirection }) => (
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
  </div>
)

Filter.propTypes = {
  busRoute: PropTypes.string,
  updateBusRoute: PropTypes.func,
  updateDirection: PropTypes.func
}

export default Filter;