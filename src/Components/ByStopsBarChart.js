import React from 'react';
import PropTypes from 'prop-types';
import { XYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis';

const width = 400;
const height = 400;

const ByStopsbarChart = (data) => (
  <XYPlot width={width} height={height}>
    <YAxis  orientation="left"
            position="end"
            title="Minutes"
    />
    <XAxis  orientation="bottom"
            position="middle"
            hideTicks
    />
    <VerticalBarSeries data={testData}>
    </VerticalBarSeries>
  </XYPlot>
);

ByStopsbarChart.propTypes = {
  data: PropTypes.object,
}


const testData=[
      {
        x: 0,
        y: 10
      },
      {
        x: 1,
        y: 8.572399085468916
      },
      {
        x: 2,
        y: 8.698206792951954
      },
      {
        x: 3,
        y: 9.909735741547557
      },
      {
        x: 4,
        y: 10.948392802633009
      },
      {
        x: 5,
        y: 12.538789788626334
      },
      {
        x: 6,
        y: 11.092960853975487
      },
      {
        x: 7,
        y: 10.681681043236832
      },
      {
        x: 8,
        y: 8.230614711258019
      }
    ];

export default ByStopsbarChart;