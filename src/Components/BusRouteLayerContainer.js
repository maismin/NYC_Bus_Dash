import React, { Component } from 'react';
import {GeoJSON } from 'react-leaflet';

class BusRouteLayerContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GeoJSON  data={this.props.geojson} 
                key={this.props.keyValue} 
                onEachFeature={this.props.onEachFeature} 
                pointToLayer={this.props.pointToLayer} 
                />
    );
  }
}

export default BusRouteLayerContainer;