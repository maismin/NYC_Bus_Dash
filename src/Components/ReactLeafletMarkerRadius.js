import React from 'react'; 
import PropTypes from 'prop-types';
import { Marker, Circle, LayerGroup} from 'react-leaflet';

const ReactLeafletMarkerRadius = ({ latlng, radius, opacity}) => (
  <LayerGroup>
    <Marker position={latlng} />
    <Circle center={latlng} radius={radius} opacity={opacity} /> 
  </LayerGroup>
)

ReactLeafletMarkerRadius.propTypes = {
  latlng: PropTypes.array,
  radius: PropTypes.number,
  opacity: PropTypes.number
}

export default ReactLeafletMarkerRadius;