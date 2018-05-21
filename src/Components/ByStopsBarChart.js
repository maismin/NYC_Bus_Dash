import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { XYPlot, XAxis, YAxis, VerticalBarSeries, Hint } from 'react-vis';

var _ = require('lodash');
const width = 400;
const height = 400;

class ByStopsbarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hintValues: {}
    };
  }

  render() {
    return (
      <XYPlot width={width} height={height} xType={'ordinal'}
              >
        <YAxis  orientation="left"
                position="end"
                title="Minutes"
        />
        <XAxis  orientation="bottom"
                position="middle"
                hideTicks
        />
        <VerticalBarSeries  data={this.props.data}
                            onValueMouseOver={(datapoint, event)=>
                              this.setState({hintValues: datapoint})
                            }
                            onValueMouseOut={()=>this.setState({hintValues: {}})}
                            >
        </VerticalBarSeries>
        { !_.isEmpty(this.state.hintValues) &&
          <Hint value={this.state.hintValues}>
            <div style={{background: 'black'}}>
              <p>{this.state.hintValues.x}</p>
              <p>{precisionRound(this.state.hintValues.y,2)}</p>
            </div>
          </Hint>
        }
      </XYPlot>
    );
  }
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

ByStopsbarChart.propTypes = {
  data: PropTypes.array
}

export default ByStopsbarChart;