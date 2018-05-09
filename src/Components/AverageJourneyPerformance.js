import React from 'react';
import PropTypes from 'prop-types';
import { XYPlot, XAxis, YAxis, AreaSeries } from 'react-vis';

const width = 400;
const height = 400;

const AverageJourneyPerformance = (xDomain, yDomain, onboardData, waitData) => (
  <XYPlot width={width} height={height}>
  <AreaSeries
    data={data1}
    opacity={1}
    style={{}}
  />
  <AreaSeries
    data={data2}
    opacity={0.5}
    style={{}}
  />
  <YAxis  orientation="left"
          position="end"
          title="Journey Time [Minutes]"
    />
</XYPlot>
);

AverageJourneyPerformance.propTypes = {
  data: PropTypes.object,
}

const data1=[
  {
    x: 0,
    y: 10
  },
  {
    x: 1,
    y: 10.13892557288856
  },
  {
    x: 2,
    y: 10.316513357645908
  },
  {
    x: 3,
    y: 9.833657342591156
  },
  {
    x: 4,
    y: 9.778189312025885
  },
  {
    x: 5,
    y: 10.102551875310878
  },
  {
    x: 6,
    y: 9.282487086807883
  },
  {
    x: 7,
    y: 8.425475720702048
  },
  {
    x: 8,
    y: 8.15283242357089
  },
  {
    x: 9,
    y: 8.094024206141732
  },
  {
    x: 10,
    y: 7.9003511561846835
  },
  {
    x: 11,
    y: 7.675249407505379
  },
  {
    x: 12,
    y: 7.845969828559697
  },
  {
    x: 13,
    y: 7.937229571814534
  },
  {
    x: 14,
    y: 8.494502903615167
  },
  {
    x: 15,
    y: 8.514946156802528
  },
  {
    x: 16,
    y: 8.854747010896075
  },
  {
    x: 17,
    y: 8.673021630575361
  },
  {
    x: 18,
    y: 8.67481644974889
  },
  {
    x: 19,
    y: 8.880349427374703
  },
  {
    x: 20,
    y: 8.87808963500808
  }
];


const data2=[
  {
    x: 0,
    y: 10
  },
  {
    x: 1,
    y: 10.639225455020025
  },
  {
    x: 2,
    y: 11.115317004711848
  },
  {
    x: 3,
    y: 10.808775647983486
  },
  {
    x: 4,
    y: 10.888236128541294
  },
  {
    x: 5,
    y: 11.187322420466012
  },
  {
    x: 6,
    y: 11.361734688391147
  },
  {
    x: 7,
    y: 11.676785066456755
  },
  {
    x: 8,
    y: 11.404049881612329
  },
  {
    x: 9,
    y: 11.289513644056761
  },
  {
    x: 10,
    y: 11.362802301276657
  },
  {
    x: 11,
    y: 11.76211895572616
  },
  {
    x: 12,
    y: 12.315412144114804
  },
  {
    x: 13,
    y: 12.48193709259368
  },
  {
    x: 14,
    y: 12.093113116552361
  },
  {
    x: 15,
    y: 12.67247655847827
  },
  {
    x: 16,
    y: 12.823165901347544
  },
  {
    x: 17,
    y: 12.747792173129456
  },
  {
    x: 18,
    y: 13.291610802998703
  },
  {
    x: 19,
    y: 13.128409339210194
  },
  {
    x: 20,
    y: 12.797046402395356
  }
];

AverageJourneyPerformance.PropTypes = {
  xDomain: PropTypes.array,
  yDomain: PropTypes.array, 
  onboardData: PropTypes.array, 
  waitData: PropTypes.array
}

export default AverageJourneyPerformance;