import React from 'react';
import PropTypes from 'prop-types';
import { GeoJSON, LayerGroup } from 'react-leaflet';

const BusRouteLayer = ({ geojson, onEachFeature, pointToLayer }) => (
  <LayerGroup>
    <GeoJSON  data={geojson}
              onEachFeature={onEachFeature} 
              pointToLayer={pointToLayer} 
              />
  </LayerGroup>
)

BusRouteLayer.propTypes = {
  geojson: PropTypes.object,
  onEachFeature: PropTypes.func,
  pointToLayer: PropTypes.func
}

export default BusRouteLayer;