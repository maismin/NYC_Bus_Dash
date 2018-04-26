import React from 'react';
import PropTypes from 'prop-types';
import { GeoJSON, LayerGroup } from 'react-leaflet';

const BusRouteLayerContainer = ({ geojson, onEachFeature, pointToLayer }) => (
  <LayerGroup>
    <GeoJSON  data={geojson}
              onEachFeature={onEachFeature} 
              pointToLayer={pointToLayer} 
              />
  </LayerGroup>
)

BusRouteLayerContainer.propTypes = {
  geojson: PropTypes.object,
  onEachFeature: PropTypes.func,
  pointToLayer: PropTypes.func
}

export default BusRouteLayerContainer;