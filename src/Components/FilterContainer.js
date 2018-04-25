import React from 'react'; 
import PropTypes from 'prop-types';
import BusRouteDropdown from './BusRouteDropdown';
import DirectionDropdown from './DirectionDropdown';

const FilterContainer = ({ busRoute, updateBusRoute, updateDirection }) => (
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

FilterContainer.propTypes = {
  busRoute: PropTypes.string,
  updateBusRoute: PropTypes.func,
  updateDirection: PropTypes.func
}

export default FilterContainer