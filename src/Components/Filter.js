import React from 'react'; 
import PropTypes from 'prop-types';
import BusRouteDropdown from './BusRouteDropdown';
import DirectionDropdown from './DirectionDropdown';
import BusStationDropDown from './BusStationDropDown';

import { Panel, Grid, Row, Col } from 'react-bootstrap';

const Filter = ({ busRoute, direction, updateBusRoute, updateDirection, updateStartStation, updateEndStation}) => (
  <Panel style={{zIndex:500}}>
    <Panel.Heading className="text-left">Filter</Panel.Heading>
    <Grid className="text-left">
      <Row>
        <Col md={4}>
            Bus Route
            <BusRouteDropdown
              value={busRoute}
              updateValue={updateBusRoute}
            />
        </Col>

        <Col md={8}>
            Directions
            <DirectionDropdown
              updateValue={updateDirection}
              busRoute={busRoute}
            />
        </Col>
      </Row>

      <Row>
        <Col md={6}>
            Start Station
            <BusStationDropDown
              busRoute={busRoute}
              direction={direction}
              updateStation={updateStartStation}
            />
        </Col>

        <Col md={6}>
            End Station
            <BusStationDropDown
              busRoute={busRoute}
              direction={direction}
              updateStation={updateEndStation}
            />
        </Col>
      </Row>
    </Grid>
  </Panel>
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