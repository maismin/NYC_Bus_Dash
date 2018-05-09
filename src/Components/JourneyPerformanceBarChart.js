import React from 'react';
import PropTypes from 'prop-types';
import { XYPlot, XAxis, YAxis, VerticalBarSeries, HorizontalGridLines} from 'react-vis';

const width = 400;
const height = 400;

const JourneyPerformanceBarChart = (xDomain, yDomain, onboardData, waitData) => (
  <XYPlot
    xType={'ordinal'}
    width={width}
    height={height}
    stackBy="y"
    xDomain={['Scheduled','Average','Planning']}
    yDomain={[0,50]}
  >
  <VerticalBarSeries
    cluster="stack 1"
    data={data1}
    style={{}}
  />
  <VerticalBarSeries
    cluster="stack 1"
    data={data2}
    style={{}}
  />
  <YAxis  orientation="left"
          position="end"
          title="Minutes"
    />
  <XAxis  orientation="bottom"
          position="end"
  />
  <HorizontalGridLines />
</XYPlot>
);

JourneyPerformanceBarChart.propTypes = {
  data: PropTypes.object,
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