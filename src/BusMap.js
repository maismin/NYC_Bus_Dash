import React, { Component } from 'react';
import { Map, TileLayer, Marker, Circle } from 'react-leaflet';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [40.785091, -73.968285];
const zoomLevel = 13;
const circleRadius = 800;
const circleOpacity = 0.7;

// const Markers = () => (
//   { this.isUserMarkerAvailable && <Marker position={userLatLng} /> }
// );

class BusMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLatLng: []
    }

    this.handleClickAtLocation = this.handleClickAtLocation.bind(this);
  }

  get isUserMarkerAvailable() {
    const userLatLng = this.state.userLatLng;
    return Array.isArray(userLatLng) && userLatLng.length;
  }

  handleClickAtLocation( target ) {
    this.setState({
      userLatLng: [target.latlng.lat, target.latlng.lng]
    });
    console.log(this.state.userLatLng);
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('click', this.handleClickAtLocation);
  }

  render() {
    return (
      <div>
        <Map
          ref = { m => { this.leafletMap = m; } }
          center={mapCenter}
          zoom={zoomLevel}
        >
          <TileLayer
            attribution = { stamenTonerAttr }
            url = { stamenTonerTiles }
          />
          { this.isUserMarkerAvailable && 
            <Marker position={this.state.userLatLng} />
          }
          { this.isUserMarkerAvailable && 
            <Circle center={this.state.userLatLng} radius={circleRadius} opacity={circleOpacity} /> 
          }
        </Map>
      </div>
    );
  }
}

export default BusMap;