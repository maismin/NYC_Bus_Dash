import React from 'react'; 
import PropTypes from 'prop-types';
import { LayerGroup, CircleMarker} from 'react-leaflet';

const ReactLeafletNearestBusStops = ({ busStops, onEachFeature, pointToLayer }) => (
  <LayerGroup>
    { busStops.features.map((busStop, index) =>
            <CircleMarker center={[busStop.geometry.coordinates[1], busStop.geometry.coordinates[0]]}
                          key={index}
            />

    ) }
  </LayerGroup>
)

ReactLeafletNearestBusStops.propTypes = {
  busStops: PropTypes.object,
  onEachFeature: PropTypes.func,
  pointToLayer: PropTypes.func
}

export default ReactLeafletNearestBusStops;