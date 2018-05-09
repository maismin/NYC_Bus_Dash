import React from 'react'; 
import PropTypes from 'prop-types';
import BusRouteDropdown from './BusRouteDropdown';
import DirectionDropdown from './DirectionDropdown';
import BusStationDropDown from './BusStationDropDown';
import WeekDropDown from './WeekDropDown';
import TimeDropDown from './TimeDropDown';

import { Panel, Grid, Row, Col } from 'react-bootstrap';

const Filter = ({ busRoute, 
                  direction, 
                  week,
                  time,
                  updateBusRoute, 
                  updateDirection, 
                  updateStartStation, 
                  updateEndStation,
                  updateWeek,
                  updateTime}) => (

  <Panel style={{zIndex:500}}>
    <Panel.Heading className="text-left">Filter</Panel.Heading>
    <Grid className="text-left">
      <Row>
        <Col md={2}>
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
        <Col md={5}>
            Start Station
            <BusStationDropDown
              busRoute={busRoute}
              direction={direction}
              updateStation={updateStartStation}
            />
        </Col>

        <Col md={5}>
            End Station
            <BusStationDropDown
              busRoute={busRoute}
              direction={direction}
              updateStation={updateEndStation}
            />
        </Col>
      </Row>

      <Row>
        <Col md={5}>
          Week
          <WeekDropDown onChange={updateWeek}
                        value={week}
                        />
        </Col>

        <Col md={5}>
          Time
          <TimeDropDown onChange={updateTime}
                          value={time}
                          />
        </Col>
      </Row>
    </Grid>
  </Panel>
)

Filter.propTypes = {
  busRoute: PropTypes.string,
  direction: PropTypes.object,
  week: PropTypes.string,
  time: PropTypes.string,
  updateBusRoute: PropTypes.func,
  updateDirection: PropTypes.func,
  updateStartStation: PropTypes.func,
  updateEndStation: PropTypes.func,
  updateWeek: PropTypes.func,
  updateTime: PropTypes.func
}

export default Filter;