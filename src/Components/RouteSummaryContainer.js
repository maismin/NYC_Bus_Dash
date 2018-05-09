import React from 'react';
import PropTypes from 'prop-types';
import ByStopsBarChart from './ByStopsBarChart';
import CumulativeTravelTimeLineChart from './CumulativeTravelTimeLineChart';
import { Panel, Grid, Row, Col, Well, Label } from 'react-bootstrap';

import '../../node_modules/react-vis/dist/style.css';

const RouteSummaryContainer = ({ excessWaitTime, routeLatenessFactor, avgSpeed }) => (
  <Panel>
    <Panel.Heading className="text-left">Route Summary</Panel.Heading>
    <Grid>
      <Row>
        <Col md={2}>
          <Row> 
            <Well bsSize="large">
              <div className="text-uppercase">
                <h5>Excess Wait Time</h5>
              </div>
              <div>{excessWaitTime} minutes</div>
            </Well>
          </Row>

          <Row> 
            <Well bsSize="large">
              <div className="text-uppercase">
                <h5>Lateness Factor</h5>
              </div>
              <div>{routeLatenessFactor}%</div>
            </Well>
          </Row>

          <Row>
            <Well bsSize="large">
                <div className="text-uppercase">
                  <h5>Average Speed</h5>
                </div>
                <div>{avgSpeed}</div>
              </Well>
          </Row>
        </Col>

        <Col md={5}>
          <ByStopsBarChart/>
        </Col>
          
        <Col md={5}>
          <Label>cumulative travel time across stops</Label>
          <CumulativeTravelTimeLineChart/>
        </Col>
      </Row>
    </Grid>
  </Panel>
);

export default RouteSummaryContainer;

RouteSummaryContainer.propTypes = {
  excessWaitTime: PropTypes.number,
  routeLatenessFactor: PropTypes.number,
  avgSpeed: PropTypes.number,
}