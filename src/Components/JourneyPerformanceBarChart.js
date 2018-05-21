import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { XYPlot, XAxis, YAxis, VerticalBarSeries, HorizontalGridLines, Hint} from 'react-vis';

var _ = require('lodash');
const width = 400;
const height = 400;

class JourneyPerformanceBarChart extends Component {
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
              <p>{this.state.hintValues.x + ' Wait Times'}</p>
              <p>{precisionRound(this.state.hintValues.y,2)}</p>
            </div>
          </Hint>
        }
      </XYPlot>
    );
  }
}


JourneyPerformanceBarChart.propTypes = {
  data: PropTypes.array,
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

const data1=[
  {
    x: 'Scheduled',
    y: 10
  },
  {
    x: 'Average',
    y: 8.572399085468916
  },
  {
    x: 'Planning',
    y: 8.698206792951954
  }
];


const data2=[
  {
    x: 'Scheduled',
    y: 10
  },
  {
    x: 'Average',
    y: 12.075890938415458
  },
  {
    x: 'Planning',
    y: 9.635628817850652
  }
];

JourneyPerformanceBarChart.PropTypes = {
  xDomain: PropTypes.array,
  yDomain: PropTypes.array, 
  onboardData: PropTypes.array, 
  waitData: PropTypes.array
}

export default JourneyPerformanceBarChart;